import "./Navbar.css";
import React, { useState, useEffect} from "react";
import Logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
   useEffect(() => {
     if (localStorage.getItem('access_token') !== null) {
        setIsAuth(true); 
      }
    }, [isAuth]);
    function logout() {
      // Perform your logout actions here
      window.location.reload();
    }
    
  return (
    <div className="container navbar-top"> 
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
        <Link className="navbar-brand mx-4 my-lg-0" to="/">
          <img src={Logo} width="45" height="49" className="d-inline-block align-top" alt=""/>
          <h1 className="d-inline-block px-1">BookRec</h1>
        </Link>
        <button className="navbar-toggler mx-5" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse mx-5 my-lg-0 justify-content-end" id="navbarNavAltMarkup">
          <div className="navbar-nav fs-5">
            {isAuth ? <Link to="/homepage" className="nav-item nav-link px-3">Home</Link>: <Link to="/" className="nav-item nav-link px-3">Home</Link>}
             {!isAuth ? (
                <>
                  <Link to="/signin" className="nav-item nav-link px-3">Sign In</Link>
                  <Link to="/signup" className="nav-item nav-link px-3">Sign Up</Link>
                </>
              ) : null}
            <Link to="/contactus" className="nav-item nav-link px-3">Contact Us</Link>
            <Link to="/aboutus" className="nav-item nav-link px-3">About Us</Link>
            {isAuth ? <Link to="/logout" className="nav-item nav-link px-3" onclick={logout} >Log out</Link> : null}
          </div>
        </div>
      </nav>
    </div>
    
  );
};

export default Navbar;
