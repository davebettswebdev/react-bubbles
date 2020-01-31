import React, { useState } from "react";
import { axiosWithAuth } from '../auth/axiosWithAuth';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleLogin = event => {
    event.preventDefault();
    axiosWithAuth().post('http://localhost:5000/api/login', credentials)
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.payload);
        props.history.push('/bubblepage');
      })
  }

  const handleChange = event => {
    setCredentials({
        ...credentials,
        [event.target.name]: event.target.value
    })
  }

  return (
    <div className="log-in">
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleLogin} >
        <input type='text' placeholder='USERNAME' name='username' value={credentials.username} onChange={handleChange} />
        <input type='password' placeholder='PASSWORD' name='password' value={credentials.password} onChange={handleChange} />
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default Login;