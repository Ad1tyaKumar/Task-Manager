import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import backEndUrl from '../host';
import { Context } from '..';

//toast
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const history= useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [loading, setLoading]=useState(false)
    const {isAuthenticated,setIsAuthenticated}=useContext(Context);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${backEndUrl}/register`, { name, email, password, cpassword }, {
                withCredentials: true,
            }).then(res => {
                console.log(res.data);
                if (res.data === 'email exists') {
                    toast(`Email already exists!`)
                    setIsAuthenticated(false);
                }
                else if (res.data.message === 'registered') {
                    console.log(isAuthenticated);
                    setIsAuthenticated(true);
                    history('/');
                }
                else if (res.data === 'pass_not_match') {
                    toast('Passwords are not matching')
                    setIsAuthenticated(false);
                }
                setLoading(false);
            });
        } catch (e) {
            setIsAuthenticated(false);
            setLoading(false);
            if(e.response.data.msg==="ValidationError"){
                toast("Enter a Valid Email")
            }
            console.log(e);

        }
    }
    return (
        <>
            <Link to={'/'} >
                <i class="fa-solid fa-arrow-left"></i>
                <button className='back'>Back Home</button>
            </Link>
            <div className='register'>
                <p>Sign Up</p>
                <div className='forms'>
                    <i class="fa-solid fa-user icon"></i>
                    <input className="input" type="text" placeholder='Name' onChange={(e) => { setName(e.target.value) }} />
                </div>
                <div className='forms'>
                    <i class="fa-solid fa-envelope icon"></i>
                    <input className="input" type="email" placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className='forms'>
                    <i class="fa-solid fa-lock icon-lock" ></i>
                    <input className="input" type="text" placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <div className='forms'>
                    <i class="fa-solid fa-lock icon-lock" ></i>
                    <input className="input" type="text" placeholder='Confirm Password' onChange={(e) => { setCPassword(e.target.value) }} />
                </div>
                <button className='login-button' onClick={handleSubmit} disabled={loading}>Register</button>
            </div>
            <p className='new'>Already a user?</p>
            <Link to={'/login'}>
                <button className='back-home'>Login</button>
            </Link>
            <ToastContainer/>
        </>
    )
}

export default Register
