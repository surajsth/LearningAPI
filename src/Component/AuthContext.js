import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    // const initialToken = localStorage.getItem("token");
    const initialToken = sessionStorage.getItem("token");

    const userData = JSON.parse(initialToken);
    const [UserID, setUserID] = useState(userData);
    const userIsLoggedIn = !!UserID; //!! used to convert in boolean

    const loginHandler = (token) => {

        setUserID(token);
        localStorage.setItem("token", JSON.stringify(token));
    };
    // console.log("data", UserID)

    const logoutHandler = () => {
        setUserID(null);
    };
    // const setSessionTimeOut = () => {
    //     localStorage.clear()
    //     localStorage.clear();
    // }
    const contextValue = {
        User: UserID,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        // setSessionTimeOut: setSessionTimeOut
    };
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;