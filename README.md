# Google & Cognito OAuth2 Authentication in Spring Security

![cover.png](cover.png)


# Setup

### 1. Prepare server env file

```text
export GOOGLE_CLIENT_ID=
export GOOGLE_CLIENT_SECRET=
export COGNITO_CLIENT_ID=
export COGNITO_CLIENT_SECRET=
export COGNITO_CLIENT_NAME=
export COGNITO_USER_POOL_ID=
export COGNITO_DOMAIN=
```


### 2. Launch Spring Boot Application 
```bash
cd server
make start
```

### 3. Launch React Application
```bash
cd web
make start
```