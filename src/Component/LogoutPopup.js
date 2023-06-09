import React, { useContext, useEffect, useState } from 'react'
import "./UserPopUp.css";
import $ from 'jquery'
import { AiOutlineClose } from 'react-icons/ai'
import LoginContext from './LoginContext';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';

function LogOutPopUp() {
    const navigate = useNavigate()
    const { alertLogout, setAlertLogout, handleLogout } =
        useContext(LoginContext)

    const AuthCtx = useContext(AuthContext)

    useEffect(() => {
        if (alertLogout) {
            $('.LogoutpopupBg').fadeIn(500);
            $('.LogoutpopUp').fadeIn(500);
        }
    }, [alertLogout])

    const handleClose = () => {
        $('.LogoutpopupBg').fadeOut(500);
        $('.LogoutpopUp').fadeOut(500);

        setAlertLogout(false)
    }

    // const handleLogout = () => {
    //     localStorage.clear()
    //     sessionStorage.clear()
    //     AuthCtx.logout();
    //     navigate('/')
    //     setAlertLogout(null)

    // }

    return (
        <div className='popupBg LogoutpopupBg'>
            <div className="popUp LogoutpopUp">
                <div className="popUp-head">
                    <h6 className='m-0'>Logout</h6>
                    <span className='close' onClick={handleClose}><AiOutlineClose /></span>
                </div>
                <div className="popup-body">
                    <h4>Are you sure you want to logout??</h4>
                </div>

                <div className="popup-close p-2 text-end">
                    <button type="button" className="btn btn-primary " onClick={handleLogout}>
                        Logout
                    </button>
                    <button type="button" className="btn btn-danger ms-3" onClick={handleClose}>Close</button>
                </div>

            </div>

        </div>
    )
}

export default LogOutPopUp