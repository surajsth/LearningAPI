import { createContext, useState, useContext } from 'react'
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';
const LoginContext = createContext()
export const LoginContextProvider = (props) => {
    const baseUrl = process.env.REACT_APP_URL;
    const [logoutDropdown, setLogoutDropdown] = useState(false)
    const [alertLogout, setAlertLogout] = useState(false)
    const [userdetail, setUserDetail] = useState('')
    const navigate = useNavigate()
    const AuthCtx = useContext(AuthContext)
    const handleLogout = () => {
        localStorage.clear()
        sessionStorage.clear()
        AuthCtx.logout();
        navigate('/')
        setAlertLogout(null)

    }
    return (<LoginContext.Provider value={{
        baseUrl, logoutDropdown, setLogoutDropdown,
        alertLogout, setAlertLogout, userdetail, setUserDetail, handleLogout
    }}>
        {
            props.children
        }
    </LoginContext.Provider>);
}

export default LoginContext;