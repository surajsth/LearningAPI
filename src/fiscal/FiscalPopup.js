import React, { useContext, useEffect } from 'react'
import FiscalContext from './FiscalContext';
import $ from 'jquery'
import { AiOutlineClose } from 'react-icons/ai'

function FiscalPopup() {
    const { error, setError, submit, setSubmit, popup, setPopup, formValue,
        setFormValue, addFiscal

    } = useContext(FiscalContext)
    useEffect(() => {
        if (popup) {
            $('.FiscalpopupBg').fadeIn(500);
            $('.FiscalpopUp').fadeIn(500);
        }
    }, [popup])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValue({ ...formValue, [name]: value })
    }
    const handleClose = () => {
        $('.FiscalpopupBg').fadeOut(500);
        $('.FiscalpopUp').fadeOut(500);
        setError({})
        setPopup(false)
    }
    const validate = (value) => {
        const errors = {}
        if (!value.startYear) {
            errors.startYear = "Please enter startYear"
        }
        if (!value.endYear) {
            errors.endYear = "Please enter endYear"
        }
        return errors
    }
    const handleFiscalSubmit = () => {
        setSubmit(true)
        setError(validate(formValue))
    }
    useEffect(() => {
        if (Object.keys(error).length === 0 && submit) {
            addFiscal()
            setSubmit(false)
        } else {
            setSubmit(false)
        }
    }, [error])
    return (
        <div>
            <div className='popupBg FiscalpopupBg'>
                <div className="popUp FiscalpopUp">
                    <div className="popUp-head">
                        <h6 className='m-0'>Add Fiscal Year</h6>
                        <span className='close' onClick={handleClose}><AiOutlineClose /></span>
                    </div>
                    <div className="popup-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="name">Enter startYear</label>
                                    <input className='form-control' onChange={handleChange} name="startYear" type="text" id="name" value={formValue.startYear} />
                                    {error.startYear && (<p>{error.startYear}</p>)}

                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="name1">Enter endYear</label>
                                    <input className='form-control' onChange={handleChange} name="endYear" type="text" id="name1" value={formValue.endYear} />
                                    {error.endYear && (<p>{error.endYear}</p>)}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="popup-close p-2 text-end">
                        <button type="button" className="btn btn-primary" onClick={handleFiscalSubmit}>
                            submit
                        </button>
                        <button type="button" className="btn btn-danger ms-3" onClick={handleClose}>Close</button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default FiscalPopup