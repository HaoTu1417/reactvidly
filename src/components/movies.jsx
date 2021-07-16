import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import "./movies.css";
import "bootstrap/dist/css/bootstrap.css";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import GenreList from "./common/GenreList";

class Movies extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    pageSize: 4,
    currentGenre: "All",
  };
  handleDelete = (movieToDelete) => {
    console.log("delete:", movieToDelete);
    const newMovieArray = this.state.movies.filter(
      (movie) => movie !== movieToDelete
    );
    this.setState({ movies: newMovieArray });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    console.log(page);
    this.setState({ currentPage: page });
  };
  handleGenreChange = (genre) => {
    this.setState({ currentGenre: genre });
  };
  render() {
    //TODO: xem lai object destruct
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      currentGenre,
    } = this.state;

    if (count === 0) return <p>There are no movies in the database</p>;

    let movies = null;
    if (this.state.currentGenre === "All") {
      movies = paginate(allMovies, currentPage, pageSize);
    } else {
      movies = paginate(
        allMovies.filter((x) => x.genre.name === currentGenre),
        currentPage,
        pageSize
      );
    }
    // console.log(allMovies.filter((x) => x.genre.name === currentGenre));
    // console.log(currentGenre);
    return (
      <React.Fragment>
        <p>Showing {count} movies in the database.</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLike(movie)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemCount="{count}"
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
        <GenreList
          genres={getGenres()}
          onGenreChange={this.handleGenreChange}
          currentGenre={this.state.currentGenre}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
