import React, {  useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '..';
import axios from 'axios';
import backEndUrl from '../host';


//toast
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const history = useNavigate();
  const {setIsAuthenticated}=useContext(Context);
  const [loading, setLoading] = useState(false);
  const [email,setEmail]=useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios
        .post(
          `${backEndUrl}/login`,
          { email, password },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res);
          if (res.data.message === "matched") {
            console.log(res.data);
            history("/");
            setIsAuthenticated(true);
          } else if (res.data === "not exist") {
            setIsAuthenticated(false);
            toast("Email does not exists");
          } else if (res.data === "wrong_pass") {
            setIsAuthenticated(false);
            toast.error("Wrong password!");
          }
          setLoading(false);
        });
    } catch (e) {
      console.log('h');
      setIsAuthenticated(false);
      setLoading(false);
      console.log(e);
    }
  };
  return (
    <>
      <Link to={'/'}>
        <i class="fa-solid fa-arrow-left"></i>
        <button className='back'>Back Home</button>
      </Link>
      <div className='login'>
        <p>Login</p>
        <div className='forms'>
          <i class="fa-solid fa-envelope icon"></i>
          <input className="input" type="email" placeholder='Your Email' onChange={(e) => { setEmail(e.target.value) }} />
        </div>
        <div className='forms'>
          <i class="fa-solid fa-lock icon-lock" ></i>
          <input className="input" type="text" placeholder='Your Password' onChange={(e) => { setPassword(e.target.value) }} />
        </div>
        <button className='login-button' disabled={loading} onClick={handleSubmit}>Login</button>
      </div>
      <p className='new'>New User?</p>
      <Link to={'/register'}>
        <button className='back-home'>Sign Up</button>
      </Link>
      <ToastContainer/>
    </>
  )
}

export default Login
