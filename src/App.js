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
import Books from "./pages/books/books"
import MyBooks from "./pages/mybooks/mybooks"
import Homepage from "./pages/homepage/Homepage"
import BookRec from "./pages/bookrec/bookrec"
import { ToastContainer } from "react-toastify";
// import {Logout} from './components/Logout';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript


function App() {
  const [data,setData] = useState([])
  
  return (
    <div className="App">
      <Router>
          <Navbar/> 
          <div className="my-2">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/homepage" element={<Homepage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/contactus" element={<ContactUs />} /> 
              <Route path="/books" element={<Books />} /> 
              <Route path="/mybooks" element={<MyBooks />} />
              <Route path="/bookrec" element={<BookRec />} />
          </Routes>
          </div>
          <ToastContainer />
      </Router>
      <Footer className="fixed-bottom"/>
    </div>
  );
}

export default App;
