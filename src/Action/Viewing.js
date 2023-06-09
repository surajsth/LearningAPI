import React, { useContext, useEffect } from 'react'
import ContextUser from '../Component/ContextUser';
import { AiOutlineClose } from 'react-icons/ai'
import CircularProgress from '@mui/material/CircularProgress';
import $ from 'jquery'
function Viewing() {
    const { viewpopUp, setViewPopup, info, setId, viewloading } = useContext(ContextUser)
    const data = info[0]
    useEffect(() => {
        if (viewpopUp) {
            $('.viewpopupBg').fadeIn(500);
            $('.viewpopUp').fadeIn(500);
        }
    }, [viewpopUp])
    const handleClose = () => {
        $('.viewpopupBg').fadeOut(500);
        $('.viewpopUp').fadeOut(500);
        setViewPopup(false)
        setId(null)
    }
    return (

        <div>
            <div className='popupBg viewpopupBg'>
                <div className="popUp viewpopUp">
                    <div className="popUp-head">
                        <h6 className='m-0'>Data information</h6>
                        <span className='close' onClick={handleClose}><AiOutlineClose /></span>
                    </div>
                    <div className="popup-body">
                        {info.length === 0 ? (<CircularProgress />) :

                            (<div className="container">
                                <tr>
                                    <th>Name</th>
                                    <td>{data.name}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td> {data.email}</td>
                                </tr>
                                <tr>
                                    <th>Role</th>
                                    <td> {data.roleName}</td>
                                </tr>
                            </div>)}

                    </div>

                    <div className="popup-close p-2 text-end">
                        <button type="button" className="btn btn-danger ms-3" onClick={handleClose}>Close</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Viewing