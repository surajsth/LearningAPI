import React from 'react'
import { Link } from 'react-router-dom';
import './NoPage.css'
function NoPage() {


    return (
        <div className='noPage'>
            <h4>404 No Page Found</h4>
            <button ><Link to="/dashboard">Go to Dashboard</Link></button>
        </div>
    )
}

export default NoPage