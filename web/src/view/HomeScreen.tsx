import {useRecoilValue} from "recoil";
import {userRoleState, userState} from "../recoil/RecoilState.ts";
import {useNavigate} from "react-router-dom";
import {Role} from "../model/Role.ts";

const HomeScreen = () => {
    const {
        user,
        role,
        showCreateCognitoUserButton,
    } = useHomeScreen()
    const navigate = useNavigate()

    return (
        <>
            <h1>Welcome to HomeScreen!!</h1>

            {user &&
                <div aria-label="email">{user.email}</div>
            }

            {role &&
                <div>Role: {role}</div>
            }

            <form action="http://localhost:8080/logout" method="post">
                <button type="submit">ログアウト</button>
            </form>

            {showCreateCognitoUserButton &&
                <button
                    onClick={() => navigate('/create-cognito-user')}
                >
                    Create Cognito User
                </button>
            }
        </>
    )
}

function useHomeScreen() {
    const user = useRecoilValue(userState)
    const role = useRecoilValue(userRoleState)
    const showCreateCognitoUserButton = role === Role.ADMIN || role === Role.MANAGER
    return {user, role, showCreateCognitoUserButton}
}

export default HomeScreen