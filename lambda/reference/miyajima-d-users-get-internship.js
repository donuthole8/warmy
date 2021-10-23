const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const tableName = "User";

exports.handler = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };

  //TODO: 取得したいテーブル名をparamオブジェクトに設定する（中身を記述）
  const param = {
    TableName: tableName,
  };

  //dynamo.scan()で全件取得
  dynamo.scan(param, function (err, data) {
    if (err) {
      response.statusCode = 500;
      response.body = JSON.stringify({
        message: "予期せぬエラーが発生しました",
      });
      callback(null, response);
      return;
    }

    //TODO: 全ユーザのpasswordを隠蔽する処理を記述
    if(data.Items){
      data.Items.forEach(function(val) {
        delete val.password;
      });
    }

    //TODO: レスポンスボディの設定とコールバックの記述
    response.body = JSON.stringify({users: data.Items,});
    callback(null,response);
  });
};
