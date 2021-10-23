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

    let body = JSON.parse(event.body);
    let userId = body.userId;
    let text = body.text;
    let category = body.category;

    //userテーブルのvalidation(パラメータのどれかが空だったら返す)
    if(!userId || !text){
        response.statusCode = 400;
        response.body = JSON.stringify({"message" : "パラメータが足りません"});
        callback(null, response);
        return;
    }

    //TODO: DBに登録するための情報をparamオブジェクトとして宣言する（中身を記述）
    let param = {
        "TableName": tableName,
        "Item": {
            "userId": userId,
            "timestamp": Date.now(),
            "text": text,
            "category": category
        }
    };

    //dynamo.put()でDBにデータを登録
    dynamo.put(param, (err, data) => {
        if (err) {
            //TODO: 登録に失敗した場合の処理を記述
            response.statusCode = 500;
            response.body = JSON.stringify({
                "message": "予期せぬエラーが発生しました"
            });
            callback(null, response);
        } else {
            //TODO: 登録に成功した場合の処理を記述
            response.statusCode = 201;
            response.body = JSON.stringify({
                "message": "OK"
            });
            callback(null, response);
        }
    });
};
