import React, { useContext, useEffect } from 'react'
import $ from 'jquery'
import { AiOutlineClose } from 'react-icons/ai'
import './PopItUp.css'
import RoleContext from '../RoleContext'

function DeleteRole() {
    const { deletepopUp, setDeletePopup, deleteRoleData, setError } = useContext(RoleContext)
    useEffect(() => {
        if (deletepopUp) {
            $('.DeletepopupBg').fadeIn(500);
            $('.DeletepopUp').fadeIn(500);
        }
    }, [deletepopUp])
    const handleClose = () => {
        $('.DeletepopupBg').fadeOut(500);
        $('.DeletepopUp').fadeOut(500);
        setError({})
        setDeletePopup(false)
    }
    const handleRoleDelete = () => {
        deleteRoleData()
    }
    return (
        <div>
            <div className='popupBg DeletepopupBg'>
                <div className="popUp DeletepopUp">
                    <div className="popUp-head">
                        <h6 className='m-0'>Delete Role</h6>
                        <span className='close' onClick={handleClose}><AiOutlineClose /></span>
                    </div>
                    <div className="popup-body">
                        Are you sure you want to delete??
                    </div>
                    <div className="popup-close p-2 text-end">
                        <button type="button" className="btn btn-primary" onClick={handleRoleDelete}>
                            Delete
                        </button>
                        <button type="button" className="btn btn-danger ms-3" onClick={handleClose}>Close</button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default DeleteRole