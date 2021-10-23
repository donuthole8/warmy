Param([string]$Option)

$YourName = Get-Content .\yourname.env | % {$_ -replace "YOURNAME=",""}
$BucketName=$YourName+"-internship"

if("lambda_deploy" -eq $Option){
    cd lambda; Get-ChildItem -Path . -File | foreach{
        $FuName = $_.Name | % {$_ -replace ".js",""}
        $Handler = $FuName + ".handler"
        $Zip = $FuName + ".zip"
        compress-archive $_.Name $Zip
        aws lambda create-function  --function-name $FuName --runtime nodejs14.x --role arn:aws:iam::347867041416:role/internship_exec_role --handler $Handler --zip-file fileb://$Zip --region ap-northeast-1
        rm -Force $Zip
    }
    cd ..
}
if("lambda_update" -eq $Option){
    cd lambda; Get-ChildItem -Path . -File | foreach{
        $FuName = $_.Name | % {$_ -replace ".js",""}
        $Zip = $FuName + ".zip"
        compress-archive $_.Name $Zip
        aws lambda update-function-code --function-name $FuName --zip-file fileb://$Zip       
        rm -Force $Zip 
    }
    cd ..
}
if("s3_deploy" -eq $Option){
    aws s3 mb s3://$BucketName
}
if("s3_update" -eq $Option){
    npm run build
    aws s3 cp .\dist s3://$BucketName --recursive --acl public-read
}

if("" -eq $Option){

    cd lambda; Get-ChildItem -Path . -File | foreach{
        if(!($_.Name | Select-String -Pattern $YourName)){
            $AddName = $YourName + "-"  + $_.Name
            Rename-Item $_ -NewName $AddName
        }
    }
    cd ..

}

if("delete_name" -eq $Option){
    cd lambda; Get-ChildItem -Path . -File | foreach{
        $FullQName = $YourName + "-"
        $DeleteName = $_.Name | % {$_ -replace $FullQName,""}
        Rename-Item $_ -NewName $DeleteName
    }
    cd ..
}