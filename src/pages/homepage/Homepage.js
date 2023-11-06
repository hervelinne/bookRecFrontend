// Import the react JS packages
import {useEffect, useState} from "react";
import axios from "axios";
import BannerImage from "../../assets/img/GirlReading.svg";
// Define the Login function.
export const Homepage = () => {
     const [message, setMessage] = useState('');
     useEffect(() => {
        if(localStorage.getItem('access_token') === null){                   
            window.location.href = '/login'
        }
        else{
         (async () => {
           try {
             const {data} = await axios.get(   
                            'http://localhost:8000/home/', {
                             headers: {
                                'Content-Type': 'application/json'
                             }}
                           );
             setMessage(data.message);
          } catch (e) {
            console.log('not auth')
          }
         })()};
     }, []);
     return (
      <div className="home container-fluid">
      <div className="row">
        <div className="col-md-5 mt-5 mx-3 ">
          <img className="rounded float-left img-fluid"  src={`${BannerImage}`}  alt ="Girl reading a book"/>
        </div>
          <div className="col-md-6 mt-5 ">
            <h1 className="card-title mt-5 pt-5 row" style={{fontSize:"5em", fontWeight: "bold"}}> Welcome Back ! </h1>
            <h2 className="card-subtitle mb-2 text-muted row"> Are you ready for new book recommendations ?  </h2>
            <p className="card-text mt-1 mt-5 row" style={{fontSize:"1.5em"}}> Our app simplifies the process of exploring books, allowing you to find and discover your favorite books in a few easy steps. </p>
          </div>
      </div>
    </div>
        )
}