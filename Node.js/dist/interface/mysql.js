"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyConnection = verifyConnection;
exports.executeSQL = executeSQL;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function verifyConnection() {
    const connection = await promise_1.default.createConnection({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 3000,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    try {
        const [rows] = await connection.execute("SELECT NOW() AS currentTime");
        console.log("MySQLサーバーへの接続に成功しました。\n情報を出力");
        console.table(rows);
        return true;
        //return false;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("MySQL接続失敗", error.message);
        }
        else {
            console.log("MySQL接続失敗", error);
        }
        return false;
    }
    finally {
        await connection.end();
    }
}
async function executeSQL(command) {
    const connection = await promise_1.default.createConnection({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 3000,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    try {
        const [rows] = await connection.execute(command);
        console.table(rows);
        return true;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("MySQL接続失敗", error.message);
        }
        else {
            console.log("MySQL接続失敗", error);
        }
        return false;
    }
    finally {
        await connection.end();
    }
}
