import React, { useState } from "react";
import { Card, Form, Button, ListGroup } from "react-bootstrap";

function MovieDetail({ movie, onBackClick,commentaries,onAddComment }) {
  const [comments, setComments] = useState(commentaries);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleAddComment = (e) => {
    e.preventDefault();
    if (name.trim() && comment.trim()) {
      setComments([...comments, { name, comment }]);
      onAddComment({ name, comment });
      setName("");
      setComment("");
    }
    
  };

  return (
    <Card className="m-3">
      <Card.Img variant="top" src={`/images/${movie.best_character.image}`}/>
      <Card.Body>
        <Card.Title>{movie.best_character.name}</Card.Title>
        <Card.Text>{movie.best_character.bio}</Card.Text>

        <Button variant="secondary" onClick={onBackClick} className="mb-3">
          Back
        </Button>

        <h5>Comments</h5>
        <Form onSubmit={handleAddComment} className="mb-3">
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Add Comment
          </Button>
        </Form>

        {comments.length > 0 && (
          <ListGroup>
            {comments.map((c, index) => (
              <ListGroup.Item key={index}>
                <strong>{c.name}:</strong> {c.comment}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
}

export default MovieDetail;