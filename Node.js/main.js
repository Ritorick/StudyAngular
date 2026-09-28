const { verifyConnection } = require("./interface/mysql");
const express = require("express");
const app = express();
const port = 3000;

console.log("Node.js server starting up");

async function listen() {
    app.get("/", (req, res) => {
        res.send(`${req.method}`);
    });

    app.listen(port, () => {
        console.log(`サーバー起動 listening port : ${port}`);
    });
}

async function Initialize() {
    const isConnected = await verifyConnection();

    if(!isConnected) {
        console.log("初期化に失敗しました。終了します。");
        return;
    }

    listen();

}

Initialize();