import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {useState, useEffect} from 'react'
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"
import Home from "./pages/home/Home"
import SignIn from "./pages/signin/SignIn"
import SignUp from "./pages/signup/SignUp"
import AboutUs from "./pages/aboutus/AboutUs"
import ContactUs from "./pages/contactus/ContactUs"
import {Logout} from './components/Logout';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript
import { Homepage } from './pages/homepage/Homepage';

function App() {
  const [data,setData] = useState([])
  useEffect(()=> {
    async function fetchData(){
      console.log(process.env.REACT_APP_API_URL)
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result) 
        setData (result);
        } catch (error) {
        console.error('Error fetching data:', error);
        }
      }
      fetchData();
  }, [])
  return (
    <div className="App">
      <Router>
          <Navbar/> 
          <div className="my-5">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/homepage" element={<Homepage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/contactus" element={<ContactUs />} /> 
              <Route path="/logout" element={<Logout/>}/>
          </Routes>
          </div>
          <Footer/>
      </Router>
    </div>
  );
}

export default App;
