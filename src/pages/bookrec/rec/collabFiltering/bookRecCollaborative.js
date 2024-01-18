// CollaborativeFilteringRec.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const BookRecCollaborative = () => {
  const [predictions, setPredictions] = useState([]);
  const [mse, setMSE] = useState(null);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get('http://localhost:8000/api/collaborative_filtering_recommendations/');
              const data = response.data;
              setPredictions(data.predictions);
              setMSE(data.mse);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchData();
  }, []);

  return (
      <div>
          <h1>Book Recommendations</h1>

          <h2>Predicted Ratings:</h2>
          <ul>
              {predictions.map(prediction => (
                  <li key={prediction.book}>{prediction.book} - {prediction.rating}</li>
              ))}
          </ul>

          <h2>Evaluation Metrics:</h2>
          <p>Mean Squared Error: {mse}</p>
      </div>
  );
};

export default BookRecCollaborative;
