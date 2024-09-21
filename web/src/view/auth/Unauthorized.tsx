import {ReactElement} from "react";
import {useRecoilValue} from "recoil";
import {userIsLoggedInState} from "../../recoil/RecoilState.ts";

const Unauthorized = (props: {children: ReactElement}) => {
    const userIsLoggedIn = useRecoilValue(userIsLoggedInState)
    return (
        !userIsLoggedIn && props.children
    )
}

export default Unauthorized