import {useRecoilValue} from "recoil";
import {userState} from "../recoil/RecoilState.ts";

const HomeScreen = () => {
    const {user} = useHomeScreen()

    return (
        <>
            <h1>Welcome to here!!</h1>

            {user &&
                <div aria-label="email">{user.email}</div>
            }

            <form action="http://localhost:8080/logout" method="post">
                <button type="submit">ログアウト</button>
            </form>
        </>
    )
}

function useHomeScreen() {
    const user = useRecoilValue(userState)

    return {user}
}

export default HomeScreen