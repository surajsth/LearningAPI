import React, { useContext, useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import ContextUser from '../Component/ContextUser';
import $ from 'jquery'
function Editing() {
    const { editpopUp, setEditPopup, editSubmit, setEditSubmit,
        formValue, setFormValue, error, setError, EditUser, isChecked, setIsChecked
    } = useContext(ContextUser)
    useEffect(() => {
        if (editpopUp) {
            $('.EditpopupBg').fadeIn(500);
            $('.EditpopUp').fadeIn(500);
        }
    }, [editpopUp])
    const handleClose = () => {
        $('.EditpopupBg').fadeOut(500);
        $('.EditpopUp').fadeOut(500);
        setEditPopup(false)
        setError({})
    }


    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target
        setFormValue({ ...formValue, [name]: value })
    }

    const validate = (value) => {
        const errors = {}
        if (!value.name) {
            errors.name = "name is required"
        }

        if (!value.role) {
            errors.role = "role is required"
        }
        return errors
    }

    const handleEditing = (e) => {
        e.preventDefault()

        setEditSubmit(true)
        setError(validate(formValue))

    }

    useEffect(() => {
        if (Object.keys(error).length === 0 && editSubmit) {
            EditUser()
            setEditSubmit(false)
        } else {
            setEditSubmit(false)
        }
    }, [error])
    return (
        <div>
            <div className='popupBg EditpopupBg'>
                <div className="popUp EditpopUp">
                    <div className="popUp-head">
                        <h6 className='m-0'>Editing data</h6>
                        <span className='close' onClick={handleClose}><AiOutlineClose /></span>
                    </div>
                    <div className="popup-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input className='form-control' onChange={handleChange} name="name" value={formValue.name} type="text" id="name" />
                                    {error.name && (<p>{error.name}</p>)}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="role">Role</label>
                                    <input className='form-control' onChange={handleChange} name="role" value={formValue.role} type="text" id="role" />
                                    {error.role && (<p>{error.role}</p>)}
                                </div>
                            </div>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" checked={isChecked} type="checkbox" name='check' id="flexCheckDefault" onChange={() => setIsChecked(!isChecked)} />
                            <label class="form-check-label" for="flexCheckDefault">
                                Check the checkbox to close
                            </label>
                        </div>

                    </div>

                    <div className="popup-close p-2 text-end">
                        <button type="button" className="btn btn-primary" onClick={handleEditing}>
                            Edit
                        </button>
                        <button type="button" className="btn btn-danger ms-3" onClick={handleClose}>Close</button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Editing