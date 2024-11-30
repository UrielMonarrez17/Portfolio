import React, { useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import './Card.css'; 

function MovieCard({ movie, onMoreClick }) {
  const [likes, setLikes] = useState(0);
  const [hover, setHover] = useState(true);

  const handleLike = () => setLikes(likes + 1);
  const handleDislike = () => setLikes(likes - 1);

  return (
    <Card
      className="movie-card shadow-lg m-3"
      style={{
        width: "18rem",
        border: hover
          ? "3px solid black":`3px solid ${(movie.best_character.affiliation == "Sith"||movie.best_character.affiliation=="Empire") ? "red": "blue"}` ,
          
        transition: "border-color 0.3s, transform 0.3s",
        transform: hover ? "scale(1)" : "scale(1.05)",
      }}
      onMouseEnter={() => setHover(false)}
      onMouseLeave={() => setHover(true)}
    >
      <Card.Img
        variant="top"
        src={hover ? `/images/${movie.poster}` : `/images/${movie.best_character.affiliation}.png`}
        className="movie-img"
      />
      <Card.Body className="text-center">
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text className="movie-description">
          { "Episode: " + movie.episode }
        </Card.Text>
        <Card.Text className="movie-description">
          { movie.year }
        </Card.Text>
        <Button variant="primary" onClick={onMoreClick}>
          More...
        </Button>
        <Row className="mt-3">
          <Col>
            <Button variant="success" size="sm" onClick={handleLike}>
              👍
            </Button>
          </Col>
          <Col>
            <Button variant="danger" size="sm" onClick={handleDislike}>
              👎
            </Button>
          </Col>
          <Col className="text-muted">{likes}</Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;