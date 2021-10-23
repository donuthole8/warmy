const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const tableName = "Warmy_Users";

exports.handler = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };

  const body = JSON.parse(event.body);
  const uName = body.uName;

  //TODO: 削除対象のテーブル名と削除したいデータのkeyをparamに設定
  const param = {
    TableName:tableName,
    Key:{
      uName:uName,
    },
  };

  //dynamo.delete()を用いてデータを削除
  dynamo.delete(param, function (err, data) {
    if (err) {
      response.statusCode = 500;
      response.body = JSON.stringify({
        message: "予期せぬエラーが発生しました",
      });
      callback(null, response);
      return;
    } else {
      //TODO: 削除に成功した場合の処理を記述
      response.body = JSON.stringify({message: "OK"});
      callback(null,response)
    }
  });
};