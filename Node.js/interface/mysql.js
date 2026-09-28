const mysql = require("mysql2/promise");

async function verifyConnection() {
    const connection = await mysql.createConnection({
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password : "Ritorick0925",
        database: "my_app"
    });

    try {
        const [rows] = await connection.execute("SELECT NOW() AS currentTime");

        console.log("MySQLサーバーへの接続に成功しました。\n情報を出力");

        console.table(rows);
        return true;
    } catch(error) {
        console.error("MySQL接続失敗", error.message);
        return false;
    }finally {
        await connection.end();
    }
}

module.exports = { verifyConnection };

