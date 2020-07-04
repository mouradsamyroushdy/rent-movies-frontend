import React, { Component } from 'react'

class MovieDetails extends Component {

    render() {
        return (
            <h1>Movie Form {this.props.match.params.id}</h1>
        );
    }
}

export default MovieDetails;