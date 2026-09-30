import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

async function verifyConnection(): Promise<boolean> {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 3000,
        user: process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    try {
        const [rows] = await connection.execute("SELECT NOW() AS currentTime");

        console.log("MySQLサーバーへの接続に成功しました。\n情報を出力");

        console.table(rows);
        return true;
        //return false;
    } catch(error) {
        if(error instanceof Error) {
            console.error("MySQL接続失敗", error.message);
        } else {
            console.log("MySQL接続失敗", error);
        }
        return false;
    }finally {
        await connection.end();
    }
}

async function executeSQL(command: string): Promise<boolean> {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 3000,
        user: process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    try {
        const [rows] = await connection.execute(command);

        console.table(rows);
        return true;
    } catch(error) {
        if(error instanceof Error) {
            console.error("MySQL接続失敗", error.message);
        } else {
            console.log("MySQL接続失敗", error);
        }
        return false;
    }finally {
        await connection.end();
    }
}

export {
    verifyConnection,
    executeSQL
};

