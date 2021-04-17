import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { deleteMovie, getMovies } from '../services/fakeMovieService';
import Pagination from './common/Pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/ListGroup';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './MoviesTable';
import _ from 'lodash';
import SearchBox from './common/SearchBox';

class Movies extends Component {
    state = { 
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        genre: null,
        searchQuery: "",
        sortColumn: {path: 'title', order: 'asc'}
    }

    componentDidMount = () => {
        const genres = [{name:"All genres"}, ...getGenres()];
        this.setState({
            movies: getMovies(),
            genres
        })
    }

    handleDelete = (movie) => {
        deleteMovie(movie._id);
        const movies = getMovies();
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
            currentPage: 1,
            searchQuery: ""
        })
    }

    handleSort = (sortColumn) => {
        this.setState({
            sortColumn
        });
    }

    handleSearch = query => {
        this.setState({
            searchQuery: query,
            genre: null
        })
    }

    getPagedData = () => {
        const { pageSize, currentPage, movies: allMovies, genre, sortColumn, searchQuery } = this.state;

        let filtered = allMovies;

        if(searchQuery)
            filtered = allMovies.filter(m => 
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        else if (genre && genre._id)
            filtered = allMovies.filter(m => m.genre._id === genre._id);
        
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]) 
        const movies = paginate(sorted, currentPage, pageSize);
        return { totalCount: filtered.length, data: movies };
    }

    render() { 
        const { length: count } = this.state.movies;
        
        const { pageSize, currentPage, genres, genre, sortColumn, searchQuery } = this.state;
        
        if(count === 0) return <p>There are no movies in database.</p>
        
        const { totalCount, data: movies } = this.getPagedData();
        
        return ( 
            <div className="row">
                <div className="col-3">
                    <ListGroup 
                        items={genres}
                        selectedItem={genre}
                        onItemSelection={this.handleItemSelection}/>
                </div>
                <div className="col">
                    <Link to="/movies/new" className="btn btn-sm btn-primary mb-2">Add Movie</Link>
                    <p>Showing {totalCount} movies in the database.</p>
                    <SearchBox value={searchQuery} onChange={this.handleSearch}/>
                    <MoviesTable 
                        movies={movies}
                        sortColumn={sortColumn}
                        onSort={this.handleSort}
                        onLike={this.handleClick} 
                        onDelete={this.handleDelete}/>
                    <Pagination moviesCount={totalCount} 
                                pageSize={pageSize}
                                currentPage={currentPage}
                                onPageChange={this.handlePageChange}/>
                </div> 
            </div>
         );
    }
}
 
export default Movies;