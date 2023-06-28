import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import backEndUrl from '../host'
import { Context } from '..'

const Header = () => {
  const history= useNavigate();
  const { isAuthenticated, setIsAuthenticated, setUser,user } = useContext(Context);
  const createGuest = async () => {
    try {
      await axios.post(`${backEndUrl}/guest`, {}, { withCredentials: true });
    } catch (e) {
      console.log(e);
    }
  }
  createGuest();
  
  const logoutHandler = async () => {
    try {
      await axios.get(`${backEndUrl}/logout`, {
        withCredentials: true,
      }).then(res=>{
        if(res.data.success){
          // console.log('fsddf');
          setIsAuthenticated(false);
          history('/');
        }
      });
      
    } catch (e) {
      console.log(e);
      setIsAuthenticated(true);
    }
  }

  useEffect(() => {
    axios.get(`${backEndUrl}/user`, {
      withCredentials: true,
    }).then(res => {
      if(res.data.user){
        setUser(res.data.user);
      }
      if (res.data.success === true) {
        setIsAuthenticated(true);
      }
      else {
        setUser({})
        setIsAuthenticated(false);
      }
    }).catch((e) => {
      console.log(e);
      setIsAuthenticated(false);
    })
  }, [setIsAuthenticated, setUser])

  return (
    <nav>
    {
      isAuthenticated?<p>Hello {user.name}</p>:<p>HELLO GUEST</p>
    }
      
      {
        isAuthenticated ?
          <Link onClick={logoutHandler}>
            <button className='back'>Logout</button>
          </Link> :
          <Link to={'/login'}>
            <button className='back'>Login</button>
          </Link>
      }
    </nav>
  )

}




export default Header
