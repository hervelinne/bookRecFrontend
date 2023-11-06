import "./SignIn.css";
import React, { useState } from "react";
import BooksLeft from "../../assets/img/BooksLeft.png";
import myConfig from "../../configs/config";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
     // Create the submit method.
     const submit = async e => {
          e.preventDefault();
          const user = {
                username: username,
                password: password
               };
          // Create the POST requuest
          const {data} = await                                                                            
                         axios.post(
                            'http://localhost:8000/token/',
                            user ,
                            {
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                withCredentials: true 
                            });


         // Initialize the access & refresh token in localstorage.      
         localStorage.clear();
         localStorage.setItem('access_token', data.access);
         localStorage.setItem('refresh_token', data.refresh);
         axios.defaults.headers.common['Authorization'] = 
                                         `Bearer ${data['access']}`;
         window.location.href = '/homepage'
    }
  return (
    <div className="sign-in container">
      <div className="leftSide container" style={{ backgroundImage : `url(${BooksLeft})` }}></div>
      <div className="rightSide">
          <h1 style={{fontSize:"3em", fontWeight: "bold"}}> Sign In </h1>
          <form id="sign-in-form" onSubmit={submit} method="POST">
              <label htmlFor="username">Username</label>
              <input name="username" placeholder="Enter your username..." type="text" value={username}
                required 
                onChange={e => setUsername(e.target.value)}/>
              <label htmlFor="password">Password</label>
              <input name="password" placeholder="Enter your password..." type="password" value={password}
                required
                onChange={e => setPassword(e.target.value)}/>
              <button type="submit"> LogIn </button>
          </form>
      </div>
    </div>
  );
};

export default SignIn;
