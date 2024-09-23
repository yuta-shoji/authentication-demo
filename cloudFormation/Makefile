create-cognito-user-pool-and-client:
	aws cloudformation create-stack --stack-name create-cognito-user-pool-and-client \
	--template-body file://createCognitoUserPoolAndClient.yml \
	--parameters ParameterKey=UserPoolName,ParameterValue=$(COGNITO_USER_POOL_NAME) \
				 ParameterKey=Domain,ParameterValue=$(COGNITO_DOMAIN) \
	--capabilities CAPABILITY_NAMED_IAM \
	--region ap-northeast-1