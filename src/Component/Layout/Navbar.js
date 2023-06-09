import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import dummy from "../dummy.jpg"
import './Navbar.css'
import Popover from '@mui/material/Popover';
import LoginContext from '../LoginContext';
import LogOutPopUp from '../LogoutPopup';
import FiscalContext from '../../fiscal/FiscalContext';
function Navbar() {
    const { userdetail, setAlertLogout, logoutDropdown, setLogoutDropdown }
        = useContext(LoginContext)

    const { singleData } = useContext(FiscalContext)
    console.log("singleData", singleData)
    // const ShowLogOut = (e) => {
    //     setLogoutDropdown(true)
    // }
    const handleLogOut = (e) => {
        e.preventDefault()
        setAlertLogout(true)
    }
    // console.log(logoutDropdown)


    return (
        <div>
            <nav className="navbar-light bg-light py-2">
                <div className="uk-container">

                    <div className="uk-flex uk-flex-between uk-flex-middle">
                        <div className="ms-2"><h5 className='m-0'>Easy Software</h5></div>
                        <div className="uk">
                            {singleData.startYear}/{singleData.endYear}
                        </div>
                        <div className='uk-flex uk-flex-middle'>
                            <div className="me-3">
                                <h5 className='m-0'>{userdetail.Name}</h5>
                                <span>{userdetail.RoleName}</span>
                            </div>

                            <div>
                                <span className="nav-item">
                                    <img src={dummy} alt="" className="img" />
                                </span>
                                <div
                                    className="uk-navbar-dropdown"
                                    uk-dropdown="animation: reveal-top; animate-out: true; duration: 700; mode: click"
                                >
                                    <button onClick={handleLogOut}>Logout</button>
                                </div>
                            </div>
                            {/* <Popover

                                open={Boolean(logoutDropdown)}
                                anchorEl={logoutDropdown}
                                onClose={() => setLogoutDropdown(null)}
                                anchorReference='anchorPosition'
                                anchorPosition={{ top: 62, left: 4500 }}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <div>
                                    <button onClick={handleLogOut}>Logout</button>
                                </div>
                            </Popover> */}
                            {/* <div className="uk-inline">
                                <button className="uk-button uk-button-default" type="button">Logout</button>
                                <div uk-dropdown="mode: click">
                                    <button onClick={handleLogout}>Logout</button>
                                </div>
                                <div className="content d-none">
                                    <div className="uk-card uk-card-default uk-card-body uk-width-1-2@m">
                                        <h3 className="uk-card-title">Are you sure you want to logout?</h3>
                                        <button>Logout</button>
                                    </div>
                                </div>
                            </div> */}

                        </div>

                    </div>
                </div>
            </nav>
            <LogOutPopUp />
        </div>
    )
}

export default Navbar