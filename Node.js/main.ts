import { verifyConnection } from "./interface/mysql";
import express, { Request, Response } from "express";
const app = express();
const port: Number = 3000;

console.log("Node.js server starting up");

async function listen(): Promise<void> {
    app.get("/api/records", (req: Request, res: Response): void => {
        console.log(req.query);//クエリー出力(Obj)

        let checkIfNumber: RegExp = /^[0-9]+$/;//数字判定正規表現
        try {
            if("limit" in req.query ) {
                const limit = req.query.limit;
                if(typeof limit === "string" && checkIfNumber.test(limit)) {
                    console.log(parseInt(limit, 10));//radix is 10(進数)
                    res.send(`${req.method}`);
                }
            }
        } catch(err) {
            console.log("err")
            res.send(`${req.method} error`);
        }
    });

    app.listen(port, () => {
        console.log(`サーバー起動 listening port : ${port}`);
    });
}

async function Initialize(): Promise<void> {
    const isConnected: boolean = await verifyConnection();

    if (!isConnected) {
        console.log("初期化に失敗しました。終了します。");
        return;
    }

    await listen();
}

Initialize();