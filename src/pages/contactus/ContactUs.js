import "./ContactUs.css";
import React from "react";
import BooksLeft from "../../assets/img/Contact_us.svg";
import { Container, Row, Col } from "react-bootstrap";

function ContactUs() {
  const formInitialDetails = {
    name : '', 
    email: '', 
    mesage: '', 
}

  return (
    <div className="contact">
    <Container>
    <Row className="align-items-center">
      <Col size={15} md={5}>
        <img src={BooksLeft} alt="contact us"/>
      </Col>
      <Col size={12} md={7}>
          <h1 className="card-title mx-4 text-center" style={{fontSize:"3.3em", fontWeight: "bold"}}> Get in touch with us  </h1>
          <form id="contact-form" method="POST">
            <Row>
                <Col size={12} sm={6} className="px-1">
                  <input name="name" 
                  type="text" placeholder="Enter full name..." />
                </Col>
                <Col size={12} sm={6} className="px-1">
                  <input name="email"
                  type="email" 
                  placeholder="Email Address..." />
                </Col>
                <Col size={12} className="px-1 ">
                  <textarea rows="6" 
                  placeholder="Enter message..." 
                  name="message"
                  required>
                  </textarea>
                  <button type="submit"><span>Send Message</span></button>
                </Col>
              </Row>
          </form>
      </Col>
      </Row>
      </Container>
    </div>
  );
};

export default ContactUs;
