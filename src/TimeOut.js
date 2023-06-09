import React, { useContext, useEffect, useState } from 'react';
import LoginContext from './Component/LoginContext';
import $ from "jquery"
// import { redirect } from "react-router-dom";

const TimeoutComponent = () => {
    const { handleLogout } = useContext(LoginContext)
    const timeoutDuration = 5000; //5 * 60 * 1000 5 minutes = 5 * 60 seconds * 1000 milliseconds

    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        let timeout;

        const resetTimer = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setIsActive(false);
            }, timeoutDuration);
        };

        const clearTimer = () => {
            clearTimeout(timeout);
        };

        const handleUserActivity = () => {
            resetTimer();
        };

        // Attach event listeners for user activity
        document.addEventListener('mousemove', handleUserActivity);
        document.addEventListener('keydown', handleUserActivity);

        resetTimer();

        // Cleanup function to remove event listeners and clear timer
        return () => {
            document.removeEventListener('mousemove', handleUserActivity);
            document.removeEventListener('keydown', handleUserActivity);
            clearTimer();
        };
    }, []);

    useEffect(() => {
        if (!isActive) {
            $('.TimeOutpopupBg').fadeIn(500);
            $('.TimeOutpopUp').fadeIn(500);

            handleLogout()
        }
    }, [isActive])

    const handleOk = () => {
        $('.TimeOutpopupBg').fadeOut(500);
        $('.TimeOutpopUp').fadeOut(500);
    }

    if (!isActive) {
        // handleLogout()
        return (<>
            <div className='popupBg TimeOutpopupBg'>
                <div className="popUp TimeOutpopUp" style={{ width: "max-content" }}>
                    <div className="popup-body">
                        <span>Session Expired. Please Login to Continue</span>
                    </div>

                    <div className="popUp-footer">
                        <button className='btn btn-primary w-100' onClick={handleOk}>Ok</button>
                    </div>
                </div>

            </div>
        </>)

    }

};

export default TimeoutComponent;
