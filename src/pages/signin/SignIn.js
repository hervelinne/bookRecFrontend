import "./SignIn.css";
import React, { useState } from "react";
import BooksLeft from "../../assets/img/BooksLeft.png";
import axios from "axios";
import  {toast}  from "react-toastify";
// import { ToastContainer, toast } from "react-toastify";
//import myConfig from "../../configs/config";

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

     // Create the submit method.
     const submit = async e => {
          e.preventDefault();
          const user = {
                email: email,
                password: password
               };
          // Create the POST requuest
        try {
          const response = await axios.post(
                            'http://localhost:8000/api/login/',
                            user,
                            {
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                            });
          // Log the entire response for debugging
          console.log("Login response:", JSON.stringify(response));
          if (response.status === 200) {
            const data = response.data;
            // Store the token in local storage
            localStorage.clear();
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem('refresh_token', data.refresh);
            localStorage.setItem('user_id', data.user_id);
            // Set the default Authorization header for all axios requests
            axios.defaults.headers.common["Authorization"] = `Bearer ${data.access_token}`;
            window.location.href = '/homepage'
            // Perform actions after successful login
            // Initialize the access & refresh token in localstorage.      
            //  localStorage.setItem('access_token', response.access);
            //  localStorage.setItem('refresh_token', response.refresh);
            //  axios.defaults.headers.common['Authorization'] = 
            //                                  `Bearer ${response['access']}`;
          } else {
            console.error("Error during login:", response.data);
            toast.error("Error during signup!", {
              position: toast.POSITION.TOP_CENTER,
              draggable: true
            });
          }
        }
         catch (error) {
          console.error("Error during login:", error.message);
        }
         
    }

  return (
    <div className="sign-in container">
      <div className="leftSide container" style={{ backgroundImage : `url(${BooksLeft})` }}></div>
      <div className="rightSide">
          <h1 style={{fontSize:"3em", fontWeight: "bold"}}> Sign In </h1>
          <form id="sign-in-form" onSubmit={submit} method="POST">
              <label htmlFor="email">Email</label>
              <input name="email" placeholder="Enter your email..." type="text" value={email}
                required 
                onChange={e => setEmail(e.target.value)}/>
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
