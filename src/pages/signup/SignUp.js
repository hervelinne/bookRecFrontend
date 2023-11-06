import "./SignUp.css";
import React  from "react";
import BooksLeft from "../../assets/img/BooksLeft.png";


function SignUp() {
    
  return (
      <div className="sign-up">
          <div className="leftSide" style={{ backgroundImage : `url(${BooksLeft})` }}></div>
          <div className="rightSide">
              <h1> Sign Up </h1>
              <form id="sign-up-form"  method="POST">
                  <label htmlFor="username">Username</label>
                  <input name="username" placeholder="Enter your username..." type="text"/>
                  <label htmlFor="email">Email</label>
                  <input name="email" placeholder="Enter your email..." type="email"/>
                  <label htmlFor="password">Password</label>
                  <input name="password" placeholder="Enter your password..." type="password"/>
                  <button type="submit"> SignUp </button>
              </form>
          </div>
      </div>
  );
};

export default SignUp;
