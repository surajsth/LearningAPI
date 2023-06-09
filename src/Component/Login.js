import React, { useState, useEffect, useContext } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import img from './see.png'
import ContextUser from './ContextUser';
import { FetchData } from './Hook/GetData';
import { toast } from 'react-toastify';
import LoginContext from './LoginContext';
import Toast from './Toast';
import AuthContext from './AuthContext';


function Login() {
    const navigate = useNavigate();
    const { baseUrl } = useContext(LoginContext)
    const AuthCtx = useContext(AuthContext)
    const [form, setForm] = useState({

        email: "",
        password: ""
    })
    const [error, setError] = useState({})
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [submit, setSubmit] = useState(false)
    let location = useLocation()
    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const validate = () => {
        const errors = {}

        if (!form.email) {
            errors.email = 'email is required'
        }
        if (!form.password) {
            errors.password = "password is required"
        }
        return errors
    }
    const handleClick = () => {
        // navigate('/dash')
        setError(validate(form))
        setSubmit(true)
    }
    useEffect(() => {
        if (Object.keys(error).length === 0 && submit) {

            const DataForm = {
                email: form.email,
                password: form.password,
                FetchURL: `${baseUrl}login`,
                Type: "POST"
            }

            FetchData(DataForm).then(function (result) {
                if (result.StatusCode === 200) {
                    const PostResult = result.Login[0]
                    localStorage.setItem("token", JSON.stringify(PostResult))
                    sessionStorage.setItem("token", JSON.stringify(PostResult))
                    AuthCtx.login(PostResult)
                    navigate('/dashboard')
                    setSubmit(false)
                }
                else {
                    setSubmit(false)
                    toast.error(result.Message, { theme: "light" })
                }
            })


        }
        else {
            setSubmit(false)
        }
    }, [error])

    return AuthCtx.isLoggedIn ? (
        <Navigate to="/timeout" replace state={{ from: location }} />

    ) : (
        <>

            <Toast />
            <div className='container mt-5' style={{ backgroundColor: "antiquewhite" }}>
                <div className="row">
                    <div className="col-6 image">
                        <img src={img} alt="" />
                    </div>
                    <div className="col-6 ">
                        <div className="form">

                            <h3 className='login'>Login</h3>

                            <p>Enter email: <input type="email" name='email' onChange={handleChange} /></p>
                            {error.email && (<p className='error'>{error.email}</p>)}
                            <p>Enter password: <input type="password" name='password' onChange={handleChange} /></p>
                            {error.password && (<p className='error'>{error.password}</p>)}
                            <button className='btn btn-outline-primary' onClick={() => handleClick()}>
                                {submit ? "loading" : "Login"}
                            </button>


                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Login