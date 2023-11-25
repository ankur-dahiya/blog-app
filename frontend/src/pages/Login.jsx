import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authContext from '../context/authContext';

function Login() {
  const[inputs,setInputs] = useState({
    username: "",
    password: "",
  })

  const[err,setErr] = useState(null);
  const navigate = useNavigate();

  const {currentUser ,login} = useContext(authContext);

  const handleChange = (e)=>{
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}));
  }

  const handleSubmit = async e =>{
    e.preventDefault();
    // TODO fix: code is not going in catch block
    try{
      await login(inputs);
      setErr(null);
      navigate("/");
    }
    catch(err){
      setErr(err);
    }
  }
  return (
    <div className='auth'>
        <h1>Login</h1>
        <form>
            <input type='text' name="username" required placeholder='username' onChange={handleChange}></input>
            <input type='password' name="password" required placeholder='password' onChange={handleChange}></input>
            <button onClick={handleSubmit}>Login</button>
            {err && <p>{err}</p>}
            <span>Don't you have an account?<Link to="/register">Register</Link></span>
        </form>
    </div>
  )
}

export default Login