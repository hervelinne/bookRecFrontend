import './books.css'; 
import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
import Modal from 'react-bootstrap/Modal';
import StarRating from './starRating'; 
// Import or implement a star rating component

export default function Books () {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasNextPage, setHasNextPage] = useState(false);
    const maxWords = 20; // Set the maximum number of words for truncation
    const [savedBooks, setSavedBooks] = useState([]); // New state for saved books
    const [savingBook, setSavingBook] = useState(false);
    const [showRatingPopup, setShowRatingPopup] = useState(false);
    const [rating, setRating] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true); // Set loading to true before fetching data
            const response = await axios.get(`http://localhost:8000/api/books_list/?page=${currentPage}`);
            setBooks(response.data.results);
            console.log("########################"+books.length)
            setHasNextPage(response.data.next !== null);
            const savedBooksResponse = await axios.get('http://localhost:8000/api/get_saved_books/', {
                method: 'GET',
                params: {
                    userId: localStorage.getItem('user_id'),
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                    
            });
            setSavedBooks(savedBooksResponse.data.saved_books); 
            setError(null);
          } catch (error) {
            console.error('Error fetching books:', error);
            setError('Error fetching books. Please try again.');
          } finally {
            setLoading(false); // Set loading to false after data is fetched or on error
          }
        };
    
        fetchData();
      }, [books.length, currentPage]);

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

        const handleSaveBook = async (book) => {
            try {
                setSavingBook(true);
                console.log('Saving book:', book);

                // Show the rating popup
                setShowRatingPopup(true);
                const response = await fetch('http://localhost:8000/api/save_book/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        bookId: book.id,
                        userId: localStorage.getItem('user_id'), 
                        rating: rating
                    }),
                });
        
                // Handle the response as needed
                // Update the savedBooks state with the newly saved book
                setSavedBooks([...savedBooks, book]);
            } catch (error) {
                console.error('Error saving the book:', error);
            }finally {
                setSavingBook(false);
            }
        };

        // Handle rating change in the popup
        const handleRatingChange = (newRating) => {
            setRating(newRating);
        };

         // Handle saving the rating and closing the popup
        const handleSaveRating = () => {
            // Save the rating along with the book using the rating and book.id
            // ... (your logic)

            // Close the rating popup
            setShowRatingPopup(false);
        };

        // Listen for changes in the savedBooks state
        useEffect(() => {
        // You can perform additional actions after saving a book, if needed
        // For example, you can enable the button after saving
        }, [savedBooks]);
        // Function to check if a book is saved
        const isBookSaved = (bookId) => {
            console.log(bookId);
            return Array.isArray(savedBooks) && savedBooks.some((savedBook) => savedBook.book__id === bookId || savedBook.id === bookId );
        };


      return (
        <Container className='books'>
            
          <h2 style={{textAlign: "center" ,fontSize:"3em", fontWeight: "bold", marginBottom: "1em"}}>Book List</h2>
          <Pagination>
                {currentPage !== 1 && (
                    <>
                        <Pagination.First onClick={() => setCurrentPage(1)} />
                        <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} />
                    </>
                )}
                <Pagination.Item active>{currentPage}</Pagination.Item>
                {hasNextPage && <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)}/>}
            </Pagination>
            {loading ? (
                <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
                </Spinner>
                ) : (
                    <Row>
                        {books.map((book) => (
                            <Col key={book.id} xs={12} md={6} lg={4} style={{ marginBottom: '1rem' }}>
                                <Card  style={{ height: '100%' }}>
                                    <Card.Header className="d-grid gap-2 d-md-block" >
                                        <Card.Text><b>Rating :</b> {book.avg_rating} ⭐️</Card.Text>
                                        <Card.Text><b>Number of ratings : </b>{book.num_ratings}</Card.Text>
                                    </Card.Header>
                                    <Card.Body className="position-relative">
                                        <Card.Title >{book.book}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
                                        <Card.Text>{truncateDescription(book.description)}...</Card.Text>
                                        <Button
                                        onClick={() => handleSaveBook(book)}
                                        variant="primary"
                                        disabled={isBookSaved(book.id) || savingBook}
                                        >
                                        {isBookSaved(book.id) ? 'Saved ❤️ ' : 'Save 💙 '}
                                        </Button>
                            
                                        <Card.Link href={book.url}  >
                                                <Button variant="link">Check the book</Button>
                                        </Card.Link>
                                        
                                    </Card.Body>
                                    <Card.Footer className="text-muted ">
                                        <p style={{textAlign: "center", fontWeight: "bold"}}>Genres :</p>
                                         {handleGenres(book.genres).map((genre, index) => (
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
                
            {/* Add pagination controls */}
            <Pagination>
                {currentPage !== 1 && (
                    <>
                        <Pagination.First onClick={() => setCurrentPage(1)} />
                        <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} />
                    </>
                )}
                <Pagination.Item active>{currentPage}</Pagination.Item>
                {hasNextPage && <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)}/>}
            </Pagination>


             {/* Rating Popup */}
            <Modal show={showRatingPopup} onHide={() => setShowRatingPopup(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Rate the Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {/* Use a star rating component to capture the user's rating */}
                <StarRating value={rating} onChange={handleRatingChange} />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleSaveRating}>
                    Save Rating
                </Button>
                </Modal.Footer>
            </Modal>

        </Container>
      );
}