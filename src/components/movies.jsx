import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import "./movies.css";
import "bootstrap/dist/css/bootstrap.css";
import Like from "./common/like";
import Share from "./common/share";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };
  handleDelete = (movieToDelete) => {
    console.log("delete:", movieToDelete);
    const newMovieArray = this.state.movies.filter(
      (movie) => movie !== movieToDelete
    );
    this.setState({ movies: newMovieArray });
  };

  getTitle = () => {
    return `Showing  ${this.state.movies.length}  movies in the database`;
  };
  handleLikeClicked(id) {
    console.log(id);
  }

  renderMovies = () => {
    if (this.state.movies.length > 0) {
      return (
        <div>
          <h1>{this.getTitle()}</h1>
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
              {this.state.movies.map((item) => (
                <tr key={item._id} className="tr">
                  <td>{item.title}</td>
                  <td>{item.genre.name}</td>
                  <td>{item.numberInStock}</td>
                  <td>{item.dailyRentalRate}</td>
                  <td>
                    <Like
                      onIconClicked={this.handleLikeClicked}
                      id={item._id}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        this.handleDelete(item);
                      }}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div>
          <h1>there is no movies</h1>
        </div>
      );
    }
  };
  render() {
    return <div>{this.renderMovies()}</div>;
  }
}

export default Movies;
