import Joi from 'joi';
import React from 'react';
import { getGenres } from '../services/fakeGenreService';
import { getMovie, saveMovie } from '../services/fakeMovieService';
import Form from './common/Form';

// const MovieForm = ({ match, history }) => {
//     return ( 
//         <div>
//             <h1>Movie with id: {match.params.id}</h1>
//             <button 
//                 className="btn btn-primary btn-sm"
//                 onClick={() => history.push('/movies')}
//                 >Save</button>
//         </div>
//      );
// }

class MovieForm extends Form {

    state = {
        data: {
            title: "",
            genreId: "",
            numberInStock: "",
            dailyRentalRate: ""
        },
        genres: [],
        errors: {}
    }

    schemaOptions = {
        _id: Joi.string(),
        title: Joi.string().required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(1).max(10).required(),
        dailyRentalRate: Joi.number().required()
    }

    schema = Joi.object(this.schemaOptions);

    componentDidMount() {
        const { match, history } = this.props;
        const genres = getGenres();
        this.setState({
            genres
        });

        const movieId = match.params.id;
        if(movieId === 'new') return;

        const movie = getMovie(movieId);
        if(!movie) return history.replace("/not-found");
        this.setState({
            data: this.mapToMovieModel(movie)
        });
    }

    doSubmit = () => {
        saveMovie(this.state.data);
        this.props.history.push("/movies");
    }

    mapToMovieModel = (movie) => {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }
    }

    render() {
        return ( 
            <div  className="col-md-6 mx-auto">
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('title', 'Title')}
                    {this.renderSelect('genreId', 'Genre', this.state.genres)}
                    {this.renderInput('numberInStock', 'Number In Stock', 'number')}
                    {this.renderInput('dailyRentalRate', 'Daily Rental Rate', 'number')}
                    {this.renderButton('Submit')}
                </form>
            </div>
         );
    }
}
 
export default MovieForm;