// BookRecContent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const BookRecContent = ({userId}) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const maxWords = 20; // Set the maximum number of words for truncation

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/get_book_recommendations/?userId=${userId}`);
        setRecommendations(response.data.recommendations);
        
      } catch (error) {
        console.error('Error fetching book recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userId]);

      // Function to truncate the description to a specified number of words
    const truncateDescription = (description) => {
        const words = description.split(' ');
        const truncatedWords = words.slice(0, maxWords);
        return truncatedWords.join(' ');
    };
  return (
    <Container>
      <h2 style={{ textAlign: 'center', fontSize: '3em', fontWeight: 'bold' }}>
        Content-Based Recommendations
      </h2>
      <p style={{ textAlign: 'center', fontSize: '1.5em', fontWeight: 'bold',  marginBottom: '1em' }}>
        Top 15 highest rated books 🏅
      </p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Row>
          {recommendations.map((recommendation) => (
            <Col key={recommendation.bookId} xs={12} md={6} lg={4} style={{ marginBottom: '1rem' }}>
              <Card style={{ height: '100%' }}>
                {/* Display book details as needed */}
                <Card.Body>
                  <Card.Title>{recommendation.bookTitle}</Card.Title>
                  <Card.Text>{truncateDescription(recommendation.bookDescription)}...</Card.Text>

                  <Card.Text>Rating : {recommendation.rating} ⭐️ </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default BookRecContent;
