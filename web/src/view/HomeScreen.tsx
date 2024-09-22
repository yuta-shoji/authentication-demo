
const HomeScreen = () => {

    return (
        <>
            <h1>Welcome to here!!</h1>

            <form action="http://localhost:8080/logout" method="post">
                <button type="submit">ログアウト</button>
            </form>
        </>
    )
}

export default HomeScreen