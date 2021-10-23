#!/bin/bash

# 名前のデータ取る
name=$(cat yourname.env | sed s/YOURNAME=//)

writename(){
    if [ "$(ls lambda/ | grep "${name}")" ]; then
        echo "既にあなたの名前に変わっているため、変更は行いません"
    else
        cd lambda
        for jsf in *.js
        do
            mv "${jsf}" "${name}-${jsf}"
        done
        echo "ファイル名の変更が完了しました"
        cd ..
    fi
}

lambda_deploy(){

    cd lambda

    for lambdaf in *.js
    do
        funame=$(echo $lambdaf | sed s/.js//)
        echo 関数${funame}のデプロイを開始します
        zip -r ${funame}.zip ${lambdaf}
        aws lambda create-function  --function-name ${funame} \
        --runtime nodejs14.x \
        --role arn:aws:iam::347867041416:role/internship_exec_role \
        --handler ${funame}.handler  --zip-file fileb://${funame}.zip \
        --region ap-northeast-1
        rm ${funame}.zip
    done
    cd ..
}

lambda_update(){
    cd lambda
    for updatelist in *.js
    do
        funame=$(echo $updatelist | sed s/.js//)
        echo ${funame}の更新
        zip -r ${funame}.zip ${updatelist}
        aws lambda update-function-code --function-name ${funame} --zip-file fileb://${funame}.zip
        rm ${funame}.zip
    done
    cd ..
}

s3_deploy(){
    aws s3 mb s3://${name}-internship
}

s3_update(){
    aws s3 cp ./dist s3://${name}-internship --recursive --acl public-read
}

deletename(){
    cd lambda
    for noname in *.js
    do
        blankp=$(echo ${noname} | sed s/${name}-//)
        mv "${noname}" "${blankp}"
    done
    echo "名前を削除しました"
    cd ..
}

case $1 in
    "") writename;;
    lambda_deploy) lambda_deploy;;
    lambda_update) lambda_update;;
    s3_deploy) s3_deploy;;
    s3_update) s3_update;;
    delete_name) deletename;;
esac
