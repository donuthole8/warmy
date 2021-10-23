const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const tableName = "User";

exports.handler = (event, context, callback) => {
  //レスポンスの雛形
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };

  const userId = event.queryStringParameters.userId; //見たいユーザのuserId

  //TODO: 取得対象のテーブル名と検索に使うキーをparamに宣言
  const param = {
    TableName:tableName,
    Key:{
      userId:userId,
    },
  };

  //dynamo.get()でDBからデータを取得
  dynamo.get(param, function (err, data) {
    if (err) {
      response.statusCode = 500;
      response.body = JSON.stringify({
        message: "予期せぬエラーが発生しました",
      });
      callback(null, response);
      return;
    }

    //TODO: 条件に該当するデータがあればパスワードを隠蔽をする処理を記述
    if(data.Item){
      delete data.Item.password;
    }

    //TODO: レスポンスボディの設定とコールバックを記述
    response.body = JSON.stringify(data.Item);
    callback(null,response);
  });
};
