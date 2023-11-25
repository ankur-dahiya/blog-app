import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";

function Register() {
  const[inputs,setInputs] = useState({
    username: "",
    email: "",
    password: "",
  })

  const[err,setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}));
  }

  const handleSubmit = async e =>{
    e.preventDefault();
    try{
      await axios.post("/auth/register",inputs);
      setErr(null);
    }
    catch(err){
      setErr(err.response.data);
      navigate("/login");
    }
  }
  return (
    <div className='auth'>
        <h1>Register</h1>
        <form>
            <input type='text' required name='username' placeholder='username' onChange={handleChange}></input>
            <input type='email' required name='email' placeholder='email' onChange={handleChange}></input>
            <input type='password' required name='password' placeholder='password' onChange={handleChange}></input>
            <button onClick={handleSubmit}>Register</button>
            {err && <p>{err}</p>}
            <span>Don you have an account?<Link to="/login">Login</Link></span>
        </form>
    </div>
  )
}

export default Register