import React, { Component } from "react";
import { getGenres } from "../../services/fakeGenreService";

const GenreList = (props) => {
  const { genres, onGenreChange, currentGenre } = props;

  return (
    <ul class="list-group">
      <li
        className={
          currentGenre === "All" ? "list-group-item active" : "list-group-item"
        }
        onClick={() => {
          onGenreChange("All");
        }}
      >
        All
      </li>
      {genres.map((genre) => (
        <li
          className={
            genre.name === currentGenre
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => {
            onGenreChange(genre.name);
          }}
        >
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

export default GenreList;
