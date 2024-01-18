// BookRecContent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const BookRecAuthorTitle = ({userId}) => {
  const [keyword, setKeyword] = useState('');
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);


  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/api/get_books_by_keyword/?keyword=${keyword}`);
      setBooks(response.data.books);
    } catch (error) {
      console.error('Error fetching books by keyword:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);

    // If the length of the keyword is 3 or more, trigger the search
    if (e.target.value.length >= 3) {
      handleSearch();
    } else {
      // If the keyword is less than 3 characters, clear the book list
      setBooks([]);
    }
  };


  const handleRecommend = async () => {
    if (selectedBook) {
      try {
        setLoading(true);
        // Call your backend API for recommendations based on selectedBook.title and selectedBook.author
        const response = await axios.get(
          `http://localhost:8000/api/get_recommendations/?title=${selectedBook.title}&author=${selectedBook.author}`
        );
        setRecommendations(response.data.recommendations);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
        <h2 style={{ textAlign: 'center', fontSize: '3em', fontWeight: 'bold' }}>
        Content-Based Recommendations
      </h2>
      <p style={{ textAlign: 'center', fontSize: '1.5em', fontWeight: 'bold',  marginBottom: '1em' }}>
        Recommendation by Author - Title 
      </p>
      <label className="mx-5" htmlFor="bookSearch" style={{ textAlign: 'center'}}> Search For a book :</label>
      <div  className="mx-5" style={{ display: 'flex'}}>
        
        <input
          type="text"
          id="bookSearch"
          value={keyword}
          onChange={handleChange}
          placeholder="Type at least 3 characters..."
          style={{ width: '20%'}}
          class="form-control"

        />
        {loading && <p>Loading...</p>}

        {books.length > 0 && (
          <select
            id="bookSelect"
            style={{ marginLeft: '10px',  width : '40%'  }}
            class="custom-select"
            onChange={(e) => setSelectedBook(books.find((book) => book.id === parseInt(e.target.value)))}
          >
            
            <option value="" disabled selected>
              Select a book
            </option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title} by {book.author}
              </option>
            ))}
          </select>
        )}

        <button onClick={handleRecommend} class="btn btn-dark" disabled={!selectedBook} style={{ marginLeft: '10px' }}>
          Recommend
        </button>
      </div>
      {/* Display recommendations */}
      {recommendations.length > 0 && (
        <div>
          <h3 style={{ textAlign: 'center', fontSize: '2em', fontWeight: 'bold',  margin: '1em' }} >Recommendations:</h3>
          <Row>
          {recommendations.map((recommendation) => (
            <Col key={recommendation.bookId} xs={12} md={6} lg={4} style={{ marginBottom: '1rem' }}>
              <Card style={{ height: '100%' }}>
                {/* Display book details as needed */}
                <Card.Body>
                  <Card.Title key={recommendation.bookTitle}>{recommendation.bookTitle}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        </div>
      )}
    </div>
  );
};

export default BookRecAuthorTitle;