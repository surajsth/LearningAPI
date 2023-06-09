import React, { useContext, useEffect } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Toast from '../Toast'
import LoginContext from '../LoginContext'
import TimeoutComponent from '../../TimeOut'

function Layout(props) {
    const { setUserDetail } = useContext(LoginContext)
    useEffect(() => {
        const user = localStorage.getItem('token')
        user.length && setUserDetail(JSON.parse(user))
    }, [])

    return (
        <div className='layout_wrapper'>
            <Toast />
            <Navbar />
            <Sidebar />
            {/* <TimeoutComponent /> */}
            <div className="side-content">
                {props.children}
            </div>
        </div>
    )
}

export default Layout