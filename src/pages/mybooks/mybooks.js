// MyBooks.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './mybooks.css';
import Container from 'react-bootstrap/Container'; 
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const MyBooks = () => {
  const [savedBooks, setSavedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const maxWords = 20; // Set the maximum number of words for truncation

  useEffect(() => {
    const fetchSavedBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/get_saved_books/', {
          method: 'GET',
          params: {
            userId: localStorage.getItem('user_id'),
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        setSavedBooks(response.data.saved_books);
        console.log(response.data.saved_books)
        setError(null);
      } catch (error) {
        console.error('Error fetching saved books:', error);
        setError('Error fetching saved books. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedBooks();
  }, []);

   // Function to truncate the description to a specified number of words
   const truncateDescription = (description) => {
    const words = description.split(' ');
    const truncatedWords = words.slice(0, maxWords);
    return truncatedWords.join(' ');
    };

  const handleGenres = (genres) => {
    let genresData = genres.slice(1, -1).replace(/'/g, "").split(', ')
    console.log(genresData[0])
    return genresData
  }

  const test = (index)=> {
    return (index % 5 === 0) ? "btn-outline-primary" : (index % 5 === 1) ? "btn-outline-success" : 
    (index % 5 === 2) ? "btn-outline-danger" : (index % 5 === 3) ? "btn-outline-warning" : 
    (index % 5 === 4) ? "btn-outline-info" :  "btn-outline-light" 
    }

   // Function to remove a book from the list of saved books
   const removeSavedBook = async (bookId) => {
    try {
      await axios.post('http://localhost:8000/api/remove_saved_book/', {
        userId: localStorage.getItem('user_id'),
        bookId: bookId,
      });
  
      // Update the savedBooks state to reflect the removal
      setSavedBooks(savedBooks.filter(book => book.book__id !== bookId));
    } catch (error) {
      console.error('Error removing saved book:', error);
      // Handle the error as needed
    }
  };

  return (
    <Container className='mybooks'>
      <h2 style={{textAlign: "center" ,fontSize:"3em", fontWeight: "bold", marginBottom: "1em"}}>My Saved Books</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error ? (
            <p>Error: {error}</p>
          ) : (
            <Row>
                {savedBooks.map((book) => (
                    <Col key={book.book__id} xs={12} md={6} lg={4} style={{ marginBottom: '1rem' }}>
                        <Card  style={{ height: '100%' }}>
                            
                            <Card.Body className="position-relative">
                                <Card.Title >{book.book__book}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{book.book__author}</Card.Subtitle>
                                <Card.Text>{truncateDescription(book.book__description)}...</Card.Text>
                                <Card.Text>My rating : {book.rating} <span style={{ color: 'gold'  }}> &#9733; </span> </Card.Text>
                                <Button
                                onClick={() => removeSavedBook(book.book__id)}
                                variant="primary"
                                >
                                 Remove Book 💔
                                </Button>
                    
                                <Card.Link href={book.url}  >
                                        <Button variant="link">Check the book</Button>
                                </Card.Link>
                                
                            </Card.Body>
                            <Card.Footer className="text-muted ">
                                <p style={{textAlign: "center", fontWeight: "bold"}}>Genres :</p>
                                    {handleGenres(book.book__genres).map((genre, index) => (
                                    index <= 4 ? (
                                        <button
                                            key={index}
                                            className={`btn ${test(index)} m-1`}
                                            type="button"
                                        >
                                            {genre}
                                        </button>
                                    ) : null
                                ))}
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
            
          )}
        </>
      )}
    </Container>
  );
};

export default MyBooks;
