import AuthRepository, {DefaultAuthRepository} from "../repository/AuthRepository.ts";
import {useState} from "react";

interface Props {
    authRepository?: AuthRepository
}

const CreateCognitoUser = (
    {
        authRepository = new DefaultAuthRepository()
    }: Props
) => {
    const {
        email,
        setEmail,
        createEmployeeUser,
    } = useCreateCognitoUser(authRepository!)

    return (
        <>
            <h1>Create Cognito User Page</h1>

            <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <button
                onClick={createEmployeeUser}
                disabled={email === ''}
            >
                ユーザーを作成する
            </button>
        </>
    )
}

const useCreateCognitoUser = (authRepository: AuthRepository) => {
    const [email, setEmail] = useState<String>('')

    function createEmployeeUser() {
        authRepository
            .createEmployeeUser(email)
            .then(response => {
                console.log({response})
            })
    }

    return {
        email,
        setEmail,
        createEmployeeUser
    }
}

export default CreateCognitoUser