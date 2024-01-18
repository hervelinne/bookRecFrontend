import "./SignUp.css";
import React  from "react";
import BooksLeft from "../../assets/img/BooksLeft.png";
import { useState } from "react";
import axios from "axios";
import  {toast}  from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password1 !== password2) {
          console.error('Passwords do not match');
          return;
        }
        const user = { email: email, password: password1, username: username }; 
        try {
            const response = await axios.post(
              'http://localhost:8000/api/signup/',
              user,
              {
                headers: {
                  'Content-Type': 'application/json'
                },
              }
            );
        
            if (response.status === 201) {
              // const data = response.data;
              toast.success("Account created successfully!", {
                position: toast.POSITION.BOTTOM_CENTER,
                draggable: true
              });
              resetForm(); 
            } else {
              console.error('Error during signup:', response.data);
              toast.error("Error during signup!", {
                position: toast.POSITION.TOP_CENTER,
                draggable: true
              });
            }
          } catch (error) {
            console.error('Error during signup:', error.message);
          }
        };
    const resetForm = () => {
            setEmail("");
            setPassword1("");
            setPassword2("");
            setUsername("");
          };
    return (
        <div className="sign-up">
            <div className="leftSide" style={{ backgroundImage : `url(${BooksLeft})` }}></div>
            <div className="rightSide">
                <h1> Sign Up </h1>
                <form id="sign-up-form"  method="POST" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input name="username" placeholder="Enter your username..." type="text"
                    value={username} onChange={(event) => setUsername(event.target.value)} required />
                    <label htmlFor="email">Email</label>
                    <input name="email" placeholder="Enter your email..." type="email"
                    value={email} onChange={(event) => setEmail(event.target.value)} required />
                    <label htmlFor="password">Password</label>
                    <input name="password" placeholder="Enter your password..." type="password"
                    value={password1} onChange={(event) => setPassword1(event.target.value)} required />
                    <label htmlFor="passwordCheck">Password Verification</label>
                    <input name="passwordCheck" placeholder="Enter your password..." type="password"
                    value={password2} onChange={(event) => setPassword2(event.target.value)} required />
                    <button type="submit"> SignUp </button>
                </form>
                
            </div>
        </div>
    );
};

export default SignUp;
