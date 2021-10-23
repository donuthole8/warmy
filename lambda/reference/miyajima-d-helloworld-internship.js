exports.handler = (event, context, callback) => {
  //レスポンスの雛形
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };

  //レスポンスボディにJSON形式の文字列を代入
  response.body = JSON.stringify({ message: "Hello World!" });
  //callback関数で呼び出し元にレスポンスを返す
  callback(null, response);
};
