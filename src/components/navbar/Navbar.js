import "./Navbar.css";
import React, { useState, useEffect} from "react";
import Logo from "../../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuth(localStorage.getItem('access_token') !== null);
    }, []);

  const handleLogout = async () => {
      try {
        await axios.post(
          'http://localhost:8000/api/logout/',
          { refresh_token: localStorage.getItem('refresh_token') },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );
  
        console.log('Logout successful');
        localStorage.clear();
        axios.defaults.headers.common['Authorization'] = null;
        // Update the isAuth state to false
        setIsAuth(false);
        navigate('/');
      } catch (error) {
        console.error('Logout failed', error);
      }
    };
    
    
  return (
    <div> 
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand mx-4 my-lg-0" to="/">
          <img src={Logo} width="45" height="49" className="d-inline-block align-top" alt=""/>
          <h1 className="d-inline-block px-1">BookRec</h1>
        </Link>
        <button className="navbar-toggler mx-5" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse mx-5 my-lg-0 justify-content-end" id="navbarNavAltMarkup">
          <div className="navbar-nav fs-5">
          <Link to={isAuth ? "/homepage" : "/"} className="nav-item nav-link px-3">Home</Link>
            {isAuth ? 
            (
              <>
                <Link to="/Books" className="nav-item nav-link px-3">Books</Link>
                <Link to="/MyBooks" className="nav-item nav-link px-3">My Books</Link>
                <Link to="/BookRec" className="nav-item nav-link px-3">Book Rec</Link>
                <Link to="#" className="nav-item nav-link px-3" onClick={handleLogout} >Log out</Link>
              </>
            )
             : (
              <>
                <Link to="/signin" className="nav-item nav-link px-3">Sign In</Link>
                <Link to="/signup" className="nav-item nav-link px-3">Sign Up</Link>
                <Link to="/contactus" className="nav-item nav-link px-3">Contact Us</Link>
                <Link to="/aboutus" className="nav-item nav-link px-3">About Us</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
    
  );
};

export default Navbar;
