create-cognito:
	aws cloudformation create-stack --stack-name yuta-create-stack \
	--template-body file://cognito.yml \
	--parameters ParameterKey=UserPoolName,ParameterValue=$(COGNITO_USER_POOL_NAME) \
				 ParameterKey=Domain,ParameterValue=$(COGNITO_DOMAIN) \
	--capabilities CAPABILITY_NAMED_IAM \
	--region ap-northeast-1

update-cognito:
	aws cloudformation update-stack --stack-name yuta-create-stack \
	--template-body file://cognito.yml \
	--parameters ParameterKey=UserPoolName,ParameterValue=$(COGNITO_USER_POOL_NAME) \
				 ParameterKey=Domain,ParameterValue=$(COGNITO_DOMAIN) \
	--capabilities CAPABILITY_NAMED_IAM \
	--region ap-northeast-1
