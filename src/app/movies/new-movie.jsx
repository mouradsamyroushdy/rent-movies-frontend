import React from 'react'
import { Form, Input } from '../../shared';
import Joi from 'joi-browser';
import { genresService, moviesService } from '../../services';

class NewMovie extends Form {
    state = {
        data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
        genres: [],
        errors: {}
    }
    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().min(0).max(100).required().label("Number In Stock"),
        dailyRentalRate: Joi.number().min(0).max(10).required().label("Daily Rental Rate"),
    }

    async componentDidMount() {
        const genres = await genresService.getGenres();
        this.setState({ genres });

        const movieId = this.props.match.params.id;
        if (movieId === 'new') return;

        const movie = await moviesService.getMovie(movieId);
        if (!movie) return this.props.history.replace('/not-found');

        this.setState({ data: this.mapToMovieModel(movie) });
    }

    render() {
        return (
            <div>
                <h1>New Movie</h1>
                <form action="">
                    {this.renderInput('title', 'Title')}
                    {this.renderSelect('genreId', 'Genre', this.state.genres)}
                    {this.renderInput('numberInStock', 'Number In Stock', 'number')}
                    {this.renderInput('dailyRentalRate', 'Daily Rental Rate', 'number')}
                    <button disabled={this.validate()} className="btn btn-primary mr-4" onClick={(e) => this.handleSubmit(e)}>Save</button>
                    <button className="btn btn-danger" onClick={(e) => this.handleClear(e)}>Clear</button>
                </form>
            </div>
        );
    }

    submit = async () => {
        await moviesService.saveMovie(this.state.data);
        this.props.history.push('/movies');
    }

    mapToMovieModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }
    }
}

export default NewMovie;