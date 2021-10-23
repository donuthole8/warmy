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

  const body = JSON.parse(event.body);

  //bodyが空だったら返す
  if (!body) {
    response.statusCode = 400;
    response.body = JSON.stringify({ message: "bodyが空です" });
    callback(null, response);
    return;
  }

  //bodyの中身を取得
  const userId = body.userId;
  const age = body.age;
  const password = body.password;
  const nickname = body.nickname;

  //userテーブルのvalidation(パラメータのどれかが空だったら返す)
  if (!userId || !password || !nickname || !age) {
    response.statusCode = 400;
    response.body = JSON.stringify({ message: "パラメータが足りません" });
    callback(null, response);
    return;
  }

  //TODO: DBに登録するための情報をparamオブジェクトとして宣言する（中身を記述）
  const param = {
    TableName: tableName,
    Item: {
      userId: userId,
      password: password,
      nickname: nickname,
      age: age,
    },
  };

  //dynamo.put()でDBにデータを登録
  dynamo.put(param, function (err, data) {
    if (err) {
      //TODO: 登録に失敗した場合の処理を記述
      response.statusCode = 500;
      response.body = JSON.stringify({
        message: "予期せぬエラーが発生しました",
      });
      callback(null, response);
      return;
    } else {
      // 【発展】signup時にtokenを返す
      response.body = JSON.stringify({
        token: "mti2021",
      });
      callback(null, response);
      return;
    }
  });
};
