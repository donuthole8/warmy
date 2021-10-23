const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const tableName = "Articles";

exports.handler = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };

  const body = JSON.parse(event.body);

  //userテーブルのvalidation(パラメータのどれかが空だったら返す)
  if(!userId || !text){
    response.statusCode = 400;
    response.body = JSON.stringify({"message" : "パラメータが足りません"});
    callback(null, response);
    return;
  }

  //TODO: DBに登録するための情報をparamオブジェクトとして宣言する（中身を記述）
  const param = {
    "TableName":tableName,
    "Item": {
      "userId": body.userId,
      "timestamp": Date.now(),
      "text": body.text,
      "category": body.category
    }
  };

  //dynamo.put()でDBにデータを登録
  dynamo.put(param, function (err, data) {
    if (err) {
      response.statusCode = 500;
      response.body = JSON.stringify({
        message: "予期せぬエラーが発生しました",
      });
      callback(null, response);
    } else {
      //TODO: 登録に成功した場合の処理を記述
      statusCode =201;
      response.body = JSON.stringify({message: "OK"});
      callback(null,response);
    }
  });
};
