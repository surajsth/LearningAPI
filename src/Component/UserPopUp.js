import React, { useContext, useEffect, useState } from 'react'
import "./UserPopUp.css";
import ContextUser from './ContextUser';
import $ from 'jquery'
import { AiOutlineClose } from 'react-icons/ai'
import Checkbox from '@mui/material/Checkbox';
import RoleContext from '../Role/RoleContext';

function UserPopUp() {
    const { popup, setPopup, formValue, setFormValue,
        error, setError, submit, setSubmit, addUser, isChecked, setIsChecked,
        isActiveChecked, setIsActiveChecked } =
        useContext(ContextUser)
    const { all } = useContext(RoleContext)
    useEffect(() => {
        if (popup) {
            $('.UserpopupBg').fadeIn(500);
            $('.UserpopUp').fadeIn(500);

        }
    }, [popup])

    const handleClose = () => {
        $('.UserpopupBg').fadeOut(500);
        $('.UserpopUp').fadeOut(500);
        setError({})
        setPopup(false)
    }

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target
        setFormValue({ ...formValue, [name]: value })
    }

    const validate = (value) => {
        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!value.name) {
            errors.name = "name is required"
        }
        if (!value.email) {
            errors.email = "email is required"
        }
        else if (!regex.test(value.email)) {
            errors.email = "Please enter valid mail"
        }
        if (!value.password) {
            errors.password = "password is required"
        }
        if (!value.role) {
            errors.role = "role is required"
        }
        return errors
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        setSubmit(true)
        setError(validate(formValue))
        // if (!isChecked) {
        //     alert('check the box')

        // }
        // else {
        //     setIsChecked(true)
        // }

    }


    useEffect(() => {
        if (Object.keys(error).length === 0 && submit) {

            addUser()
            setSubmit(false)
        } else {
            setSubmit(false)
        }
    }, [error])



    return (
        <div className='popupBg UserpopupBg'>
            <div className="popUp UserpopUp">
                <div className="popUp-head">
                    <h6 className='m-0'>Add user</h6>
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
                                <label htmlFor="email">Email</label>
                                <input className='form-control' onChange={handleChange} name="email" value={formValue.email} type="text" id="email" />
                                {error.email && (<p>{error.email}</p>)}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="pasword">Password</label>
                                <input className='form-control' onChange={handleChange} name="password" value={formValue.password} type="password" id="pasword" />
                                {error.password && (<p>{error.password}</p>)}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="role">Role</label>
                                <select className='form-select' onChange={handleChange} name="role" id="role" value={formValue.role}>
                                    <option value="" disabled selected>Select role</option>
                                    {all.map((data) =>
                                    (
                                        <option key={data._id} value={data.roleName
                                        }>{data.roleName}</option>
                                    )
                                    )}
                                </select>
                                {/* <input className='form-control' onChange={handleChange} name="role" value={formValue.role} type="text" id="role" /> */}
                                {error.role && (<p>{error.role}</p>)}
                            </div>
                        </div>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" checked={isActiveChecked} type="checkbox" name='check'
                            id="flexCheckDefault" onChange={() => setIsActiveChecked(!isActiveChecked)} />
                        <label class="form-check-label" for="flexCheckDefault">
                            Active
                        </label>
                    </div>

                    <div class="form-check1">
                        <input class="form-check-input" checked={isChecked} type="checkbox" name='check'
                            id="flexCheckDefault1" onChange={() => setIsChecked(!isChecked)} />
                        <label class="form-check-label mx-2" for="flexCheckDefault1">
                            Check the checkbox to close
                        </label>
                    </div>



                </div>
                <div className="popup-close p-2 text-end">
                    <button type="button" className={`btn btn-primary ${submit ? "disable" : ""}`} onClick={handleSubmit}>
                        {submit ? "Addding..." : "Add"}
                    </button>
                    <button type="button" className="btn btn-danger ms-3" onClick={handleClose}>Close</button>
                </div>

            </div>

        </div>
    )
}

export default UserPopUp