const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const tableName = "Articles";

exports.handler = (event, context, callback) => {
    let response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin" : "*"
        },
        body: JSON.stringify({"message" : ""})
    };

    //TODO: 取得したいテーブル名をparamオブジェクトに設定する（中身を記述）
    let param = {
        TableName: tableName,
        Limit: 100
    };

    //dynamo.scan()で全件取得
    dynamo.scan(param, function(err, data){
        if(err){
            //TODO: //データの取得に失敗
            response.statusCode = 500;
            response.body = JSON.stringify({
                message: "予期せぬエラーが発生しました"
            });
            callback(null, response);
            return;
        }

        //TODO: レスポンスボディの設定とコールバックの記述
        response.body = JSON.stringify({
            sposts: data.Items
        });
        callback(null, response);
        return;
    });
};
