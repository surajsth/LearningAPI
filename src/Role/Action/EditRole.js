import React, { useContext, useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import RoleContext from '../RoleContext';
import $ from 'jquery'

function EditRole() {
    const { editpopUp, setEditPopup, editSubmit, setEditSubmit,
        formValue, setFormValue, error, setError, EditRoleUser
    } = useContext(RoleContext)
    useEffect(() => {
        if (editpopUp) {
            $('.EditpopupBg').fadeIn(500);
            $('.EditpopUp').fadeIn(500);
        }
    }, [editpopUp])
    const handleClose = () => {
        $('.EditpopupBg').fadeOut(500);
        $('.EditpopUp').fadeOut(500);
        setError({})
        setEditPopup(false)
    }
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target
        setFormValue({ ...formValue, [name]: value })
    }

    const validate = (value) => {
        const errors = {}

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
            EditRoleUser()
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
                        <h6 className='m-0'>Delete Role</h6>
                        <span className='close' onClick={handleClose}><AiOutlineClose /></span>
                    </div>
                    <div className="popup-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="name">Role</label>
                                    <input className='form-control' onChange={handleChange} name="role" value={formValue.role} type="text" id="name" />
                                    {error.role && (<p>{error.role}</p>)}
                                </div>
                            </div>
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

export default EditRole