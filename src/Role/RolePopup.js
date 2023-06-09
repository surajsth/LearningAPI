import React, { useContext, useEffect } from 'react'
import $ from 'jquery'
import '../Component/UserPopUp.css'
import { AiOutlineClose } from 'react-icons/ai'
import RoleContext from './RoleContext'
function RolePopup() {
    const { formValue, setFormValue, popup, setPopup, error, setError,
        submit, setSubmit, addRole

    } = useContext(RoleContext)

    useEffect(() => {
        if (popup) {
            $('.RolepopupBg').fadeIn(500);
            $('.RolepopUp').fadeIn(500);
        }
    }, [popup])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValue({ ...formValue, [name]: value })
    }
    const handleClose = () => {
        $('.RolepopupBg').fadeOut(500);
        $('.RolepopUp').fadeOut(500);
        setError({})
        setPopup(false)
    }
    const validate = (value) => {
        const errors = {}
        if (!value.role) {
            errors.role = "Please enter Role"
        }
        return errors
    }
    const handleRoleSubmit = () => {
        setSubmit(true)
        setError(validate(formValue))
    }
    useEffect(() => {
        if (Object.keys(error).length === 0 && submit) {
            addRole()
            setSubmit(false)
        } else {
            setSubmit(false)
        }
    }, [error])


    return (
        <div>
            <div className='popupBg RolepopupBg'>
                <div className="popUp RolepopUp">
                    <div className="popUp-head">
                        <h6 className='m-0'>Add user</h6>
                        <span className='close' onClick={handleClose}><AiOutlineClose /></span>
                    </div>
                    <div className="popup-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="name">Enter Role</label>
                                    <input className='form-control' onChange={handleChange} name="role" type="text" id="name" value={formValue.role} />
                                    {error.role && (<p>{error.role}</p>)}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="popup-close p-2 text-end">
                        <button type="button" className="btn btn-primary" onClick={handleRoleSubmit}>
                            {submit ? "Addding..." : "Add"}
                        </button>
                        <button type="button" className="btn btn-danger ms-3" onClick={handleClose}>Close</button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default RolePopup