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

  let userId = event.queryStringParameters.userId;
  let start = parseInt(event.queryStringParameters.start, 10);
  let end = parseInt(event.queryStringParameters.end, 10);
  let category = event.queryStringParameters.category;
  let param = {};

  //そもそもユーザーがない
  if(!userId){
    response.statusCode = 400;

    // レスポンス内容
    response.body = {
        message : "userIdがありません",
        detail : {
            userId : userId,
            startTime : start,
            endTime : end,
            category : category,
        },
    };
    callback(null,response);
    return;
  }

  //時刻が片方しか入力されていない
  if((!start&&end) || (!end&&start)){
    response.statusCode = 400;

    // レスポンス内容
    response.body = {
        message : "時刻が正しく入力されていません",
        detail : {
            userId : userId,
            startTime : start,
            endTime : end,
            category : category,
        },
    };
    callback(null,response);
    return;
  }

  //ユーザーのみ入力
  if(!start && !category){
    param = {
      TableName : tableName,
      KeyConditionExpression : "userId = :uid",
      //検索値のプレースホルダの定義
      ExpressionAttributeValues : {
          ":uid": userId
      }
    };
  }else if(!start && category){
    param = {
      TableName : tableName,
      //キー、インデックスによる検索の定義
      KeyConditionExpression : "userId = :uid",
      //プライマリーキー以外の属性でのフィルタ
      FilterExpression : "#catg = :category",
      //属性名のプレースホルダの定義
      ExpressionAttributeNames : {
        "#catg": "category"
      },
      //検索値のプレースホルダの定義
      ExpressionAttributeValues : {
          ":uid": userId,
          ":category":category
      }
    }
  }else if(start && !category){
    param = {
      TableName : tableName,
      //キー、インデックスによる検索の定義
      KeyConditionExpression : "userId = :uid AND (#time BETWEEN :from AND :to)",
      //プライマリーキー以外の属性でのフィルタ
      // "FilterExpression" : "",
      //属性名のプレースホルダの定義
      ExpressionAttributeNames : {
          "#time": "timestamp"
      },
      //検索値のプレースホルダの定義
      ExpressionAttributeValues : {
          ":uid": userId,
          ":from": start,
          ":to": end
    }
  };
  }else{
    param = {
      TableName : tableName,
      //キー、インデックスによる検索の定義
      KeyConditionExpression : "userId = :uid AND (#time BETWEEN :start AND :end)",
      //プライマリーキー以外の属性でのフィルタ
      FilterExpression : " #catg = :category",
      //属性名のプレースホルダの定義
      ExpressionAttributeNames : {
          "#time": "timestamp",
          "#catg": "category"
      },
      //検索値のプレースホルダの定義
      ExpressionAttributeValues : {
          ":uid": userId,
          ":start": start,
          ":end": end,
          ":category": category
      }
  };
  }

  //dynamo.delete()を用いてデータを削除
  dynamo.query(param, (err, data) => {
    //userの取得に失敗
    if(err){
        console.log(err);
        response.statusCode = 500;
        response.body = JSON.stringify({"message" : "予期せぬエラーが発生しました"});
        return callback(null, response);
    }
    //TODO: 該当するデータが見つからない場合の処理を記述(ヒント：data.Itemsの中身が空)
    if (!data.Items.length) {
        response.statusCode = 401;
        response.body = JSON.stringify({
            "message" : "条件に合致するものがありません"
        });
        return callback(null, response);
    }

    //TODO: 認証が成功した場合のレスポンスボディとコールバックを記述
    response.body = JSON.stringify(data.Items);
    return callback(null, response);
  });
};
