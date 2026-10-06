"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("./interface/mysql");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
console.log("Node.js server starting up");
async function listen() {
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.get("/api/records", async (req, res) => {
        console.log("GET", req.query); //クエリー出力(Obj)
        let checkIfNumber = /^[0-9]+$/; //数字判定正規表現
        try {
            if ("limit" in req.query && "user_id" in req.query) {
                const limit = req.query.limit;
                const user_id = req.query.user_id;
                if (typeof limit === "string" && checkIfNumber.test(limit)) {
                    if (typeof user_id === "string" && checkIfNumber.test(user_id)) {
                        console.log(parseInt(limit, 10)); //radix is 10(進数)
                        const query_result = await (0, mysql_1.executeSQL)(`SELECT * FROM bmi_records WHERE user_id = ${user_id} ORDER by id ASC LIMIT ${limit}`);
                        res.send(query_result);
                        console.log(query_result[0]);
                    }
                }
            }
            else {
                res.send("please put in limit and user_id");
            }
        }
        catch (err) {
            console.log("err");
            res.send(`${req.method} error`);
        }
    });
    app.post("/api/records", async (req, res) => {
        console.log("POST", req.body); //クエリー出力(Obj)
        let checkIfNumber = /^[0-9]+$/; //数字判定正規表現
        try {
            const query = req.body;
            console.log(query);
            const requiredKeys = ["user_id", "height", "weight"];
            const missingKeys = requiredKeys.filter(key => !(key in query));
            if (missingKeys.length > 0) {
                res.status(400).send({
                    error: "必要なキーがありません",
                    missingKeys: missingKeys
                });
                return;
            }
            const bmi = Number((query.weight / ((query.height / 100) ** 2)).toFixed(1));
            const query_result = await (0, mysql_1.executeSQL)(`INSERT INTO bmi_records (user_id, height, weight) VALUES (${query.user_id}, ${query.height}, ${query.weight});`);
            console.log(query_result);
            res.send({
                message: "キーを確認",
                data: query,
                bmi: bmi
            });
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
