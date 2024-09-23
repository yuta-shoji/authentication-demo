create-cognito-user-pool-and-client:
	aws cloudformation create-stack --stack-name create-cognito-user-pool-and-client \
	--template-body file://createCognitoUserPoolAndClient.yml \
	--parameters ParameterKey=UserPoolName,ParameterValue=$(COGNITO_USER_POOL_NAME) \
				 ParameterKey=Domain,ParameterValue=$(COGNITO_DOMAIN) \
	--capabilities CAPABILITY_NAMED_IAM \
	--region ap-northeast-1

create-cognito-user-pool-group:
	aws cloudformation create-stack --stack-name create-cognito-user-pool-group \
	--template-body file://createCognitoUserGroup.yml \
	--parameters ParameterKey=UserPoolId,ParameterValue=$(COGNITO_USER_POOL_ID) \
				 ParameterKey=UserGroupName,ParameterValue=$(COGNITO_USER_POOL_GROUP_NAME) \
				 ParameterKey=Description,ParameterValue=$(COGNITO_USER_POOL_GROUP_DESCRIPTION) \
	--capabilities CAPABILITY_NAMED_IAM \
	--region ap-northeast-1