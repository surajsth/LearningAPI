import React, { useContext, useState, useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import $ from 'jquery'
import ContextUser from '../Component/ContextUser';

function Deleting() {
    const { deletepopUp, setDeletePopup, deleteData, isDeleting, setIsDeleting } = useContext(ContextUser)

    useEffect(() => {
        if (deletepopUp) {
            $('.deletepopupBg').fadeIn(500);
            $('.deletepopUp').fadeIn(500);
        }
    }, [deletepopUp])

    const handleClose = () => {
        $('.deletepopupBg').fadeOut(500);
        $('.deletepopUp').fadeOut(500);
        setDeletePopup(false)
        setIsDeleting(false)
    }

    const handleDelete = () => {
        deleteData()
        setIsDeleting(true)
    }
    return (
        <div>
            <div className='popupBg deletepopupBg'>
                <div className="popUp deletepopUp">
                    <div className="popUp-head">
                        <h6 className='m-0'>Deleting data</h6>
                        <span className='close' onClick={handleClose}><AiOutlineClose /></span>
                    </div>
                    <div className="popup-body">
                        <h4>Are you sure you want to Delete??</h4>
                    </div>

                    <div className="popup-close p-2 text-end">
                        <button type="button" className="btn btn-primary " onClick={handleDelete}>
                            {isDeleting ? "Deleteing" : "delete"}
                        </button>
                        <button type="button" className="btn btn-danger ms-3" onClick={handleClose}>Close</button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Deleting