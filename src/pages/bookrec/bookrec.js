// BookRec.js
import React, { useState, useEffect } from 'react';
import './bookrec.css'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import BookRecContent from './rec/contentBased/bookRecContent'; // Import your content-based recommendation component
import BookRecCollaborative from './rec/collabFiltering/bookRecCollaborative'; // Import your collaborative filtering recommendation component
import BookRecAuthorTitle from './rec/contentBased/bookRecAuthorTitle';
import BookRecGenreTitle from './rec/contentBased/bookRecGenreTitle'; 
const BookRec = () => {
  const [selectedType, setSelectedType] = useState('content');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('user_id'); 

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };


  return (
    <div className="mx-4">
      {/* Dropdown menu to select recommendation type */}
      <Dropdown onSelect={handleTypeChange} >
        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ width: '20%' }}>
          Select Recommendation Type
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ width: '20%' }}>
          {/* --------- Content Based ----------*/}
          <Dropdown onSelect={handleTypeChange} className="mx-3">
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              Content Based
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item eventKey="content">Highest rating</Dropdown.Item>
                <Dropdown.Item eventKey="author_title">Author & Title</Dropdown.Item>
                <Dropdown.Item eventKey="genre_title">Genre & Title</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* --------- Collaborative Filtering  ----------*/}
          <Dropdown onSelect={handleTypeChange} className="mx-3" >
            <Dropdown.Toggle variant="light" id="dropdown-basic">
            Collaborative Filtering
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item eventKey="userItem">User - Item</Dropdown.Item>
                <Dropdown.Item eventKey="content">Item - Item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
          {/* Add more recommendation types as needed */}
        </Dropdown.Menu>
      </Dropdown>

      {/* Display the selected type of recommendations */}
      {selectedType === 'content' && <BookRecContent userId={userId} />}
      {selectedType === 'author_title' && <BookRecAuthorTitle userId={userId} />}
      {selectedType === 'genre_title' && <BookRecGenreTitle userId={userId} />}
      {selectedType === 'userItem' && <BookRecCollaborative userId={userId} />}
      {/* Add more conditional rendering for other recommendation types */}
    </div>
  );

};

export default BookRec;