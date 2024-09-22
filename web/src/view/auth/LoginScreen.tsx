const LoginScreen = () => {
    console.log('LoginScreen rendered')
    return (
        <>
            <h1>ログイン</h1>
            <div>
                <a href="http://localhost:8080/oauth2/authorization/google">
                    Sign in with Google
                </a>
            </div>

            <div>
                <a href="http://localhost:8080/oauth2/authorization/cognito">
                    Sign in with Cognito
                </a>
            </div>
        </>
    )
}

export default LoginScreen