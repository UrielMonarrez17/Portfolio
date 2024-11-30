import React, { useState } from "react";
import MovieCard from "./MovieCard";
import MovieDetail from "./MovieDetail";
import movies from "./data/data"; 
import './Card.css'; 

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [comments, setComments] = useState({});

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };


  const handleAddComment = (movieName, comment) => {
    setComments((prev) => ({
      ...prev,
      [movieName]: [...(prev[movieName] || []), comment],
    }));
  };

  return (
    <div className="app">
      <h1>Movies</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.name}
            movie={movie}
            onMoreClick={() => handleSelectMovie(movie)}
          />
        ))}
      </div>
      {selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          onBackClick={()=>{setSelectedMovie(null)}}
          commentaries={comments[selectedMovie.name] || []}
          onAddComment={handleAddComment}
        />
      )}
    </div>
  );
}

export default App;