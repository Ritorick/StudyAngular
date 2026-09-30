"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("./interface/mysql");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
console.log("Node.js server starting up");
async function listen() {
    app.get("/api/records", (req, res) => {
        console.log(req.query); //クエリー出力(Obj)
        let checkIfNumber = /^[0-9]+$/; //数字判定正規表現
        try {
            if ("limit" in req.query) {
                const limit = req.query.limit;
                if (typeof limit === "string" && checkIfNumber.test(limit)) {
                    console.log(parseInt(limit, 10)); //radix is 10(進数)
                    res.send(`${req.method}`);
                }
            }
        }
        catch (err) {
            console.log("err");
            res.send(`${req.method} error`);
        }
    });
    app.listen(port, () => {
        console.log(`サーバー起動 listening port : ${port}`);
    });
}
async function Initialize() {
    const isConnected = await (0, mysql_1.verifyConnection)();
    if (!isConnected) {
        console.log("初期化に失敗しました。終了します。");
        return;
    }
    await listen();
}
Initialize();
