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

  //TODO: paramに更新対象のテーブル名と更新内容を記述
  const param = {
    TableName:tableName,
    Item: {
      uName: body.uName,
      uPassword: body.uPassword,
      uMail: body.uMail,
      uCategory: body.uCategory,
      uType: body.uTypeZ
    }
  };

  dynamo.put(param, function (err, data) {
    if (err) {
      response.statusCode = 500;
      response.body = JSON.stringify({
        message: "予期せぬエラーが発生しました",
      });
      callback(null, response);
      return;
    } else {
      //TODO: 更新に成功した場合の処理を記述
      response.body = JSON.stringify({message: "OK"});
      callback(null,response);
    }
  });
};
