import React, { useContext, useEffect } from 'react'
import RoleContext from '../RoleContext';
import $ from 'jquery'
import { AiOutlineClose } from 'react-icons/ai'
import CircularProgress from '@mui/material/CircularProgress';

function ViewRole() {
    const { viewpopUp, setViewPopup, info, setId } = useContext(RoleContext)
    const data = info[0]

    useEffect(() => {
        if (viewpopUp) {
            $('.ViewpopupBg').fadeIn(500);
            $('.ViewpopUp').fadeIn(500);
        }
    }, [viewpopUp])
    const handleClose = () => {
        $('.ViewpopupBg').fadeOut(500);
        $('.ViewpopUp').fadeOut(500);
        setViewPopup(false)
        setId(null)
    }

    return (
        <div>
            <div className='popupBg ViewpopupBg'>
                <div className="popUp ViewpopUp">
                    <div className="popUp-head">
                        <h6 className='m-0'>Displaying user data</h6>
                        <span className='close' onClick={handleClose}><AiOutlineClose /></span>
                    </div>
                    <div className="popup-body">
                        {info.length === 0 ? (<CircularProgress />) :

                            (<div className="container">
                                <tr>
                                    <th>Name</th>
                                    <td>{data.roleName}</td>
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

export default ViewRole