import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      searchItem: ''
    };
  }

  componentDidMount() {
    this.fetchMovies('popular');
  }

  fetchMovies = async (category) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${category}?api_key=7a0c310ae3d3f5934c7909bd29911d51`
      );
      const data = await response.json();
      this.setState({ movies: data.results});
    } catch (err) {
      console.log(err);
    }
  };

  TabChange = (category) => {
    this.fetchMovies(category);
  };

  SearchMovie = (event) => {
    this.setState({ searchItem: event.target.value });
  };

  render() {
    const { movies, searchItem } = this.state;

    return (
      <div className="App">
        <nav className="navbar">
          <div className="navbar-left">
            <p>Moviedb</p>
          </div>
          <div className="navbar-right">
            <div className="navbar-item" onClick={() => this.TabChange('popular')}>Popular</div>
            <div className="navbar-item" onClick={() => this.TabChange('top_rated')}>Top Rated</div>
            <div className="navbar-item" onClick={() => this.TabChange('upcoming')}>Upcoming</div>
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Movie Name"
                value={searchItem}
                onChange={this.SearchMovie}
              />
              <button>Search</button>
            </div>
          </div>
        </nav>
        <div className="movies-container">
          {movies.map(movie => (
            <div key={movie.id} className="movie">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
              
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
