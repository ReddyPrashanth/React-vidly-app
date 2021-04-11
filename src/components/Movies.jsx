import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './Like';
import Pagination from './common/Pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/ListGroup';
import { getGenres } from '../services/fakeGenreService';

class Movies extends Component {
    state = { 
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        genre: null
    }

    componentDidMount = () => {
        const genres = [{name:"All genres"}, ...getGenres()];
        this.setState({
            movies: getMovies(),
            genres
        })
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => movie._id !== m._id);
        this.setState({
            movies,
            currentPage: 1
        });
    }

    handleClick = (movie) => {
        const movies = [...this.state.movies];
        const index = this.state.movies.indexOf(movie);
        movies[index] = {...movie};
        movies[index].liked = !movies[index].liked;
        this.setState({
            movies
        });
    }

    handlePageChange = (currentPage) => {
        this.setState({
            currentPage
        });
    }

    handleItemSelection = (genre) => {
        this.setState({
            genre,
            currentPage: 1
        })
    }

    render() { 
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, movies: allMovies, genres, genre } = this.state;
        const filtered = genre && genre._id ? allMovies.filter(m => m.genre._id === genre._id)
                               : allMovies; 
        const movies = paginate(filtered, currentPage, pageSize);
        if(count === 0) return <p>There are no movies in database.</p>
        return ( 
            <div className="row">
                <div className="col-3">
                    <ListGroup 
                        items={genres}
                        selectedItem={genre}
                        onItemSelection={this.handleItemSelection}/>
                </div>
                <div className="col">
                <p>Showing {filtered.length} movies in the database.</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {movies.map(movie => (
                        <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td>
                                    <Like onClick={() => this.handleClick(movie)} liked={movie.liked}/>
                                </td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => this.handleDelete(movie)}>Delete</button>
                                </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Pagination moviesCount={filtered.length} 
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}/>
                </div> 
            </div>
         );
    }
}
 
export default Movies;