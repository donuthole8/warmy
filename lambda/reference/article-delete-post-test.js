const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const tableName = "Articles";

exports.handler = (event, context, callback) => {
    let response = {
        statusCode : 200,
        headers: {
            "Access-Control-Allow-Origin" : "*"
        },
        body: JSON.stringify({"message" : ""})
    };

    let body = JSON.parse(event.body);
    let userId = body.userId;
    let timestamp = body.timestamp;

    //TODO: 削除対象のテーブル名と削除したいデータのkeyをparamに設定
    let param = {
        "TableName": tableName,
        "Key": {
            "userId": userId,
            "timestamp": timestamp
        }
    };

    //dynamo.delete()を用いてデータを削除
    dynamo.delete(param, function(err, data){
        if(err){
            //TODO: 削除に失敗した場合の処理を記述
            response.statusCode = 500;
            response.body = JSON.stringify({
                "message": "予期せぬエラーが発生しました"
            });
            callback(null, response);
        }else{
            //TODO: 削除に成功した場合の処理を記述
            response.body = JSON.stringify("success");
            callback(null, response);
        }
    });
};
