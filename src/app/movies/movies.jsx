//#region --------------------------------------- React
import React, { Component } from 'react';
//#endregion ------------------------------------
import queryString from 'query-string';
import _ from 'lodash';
//#region --------------------------------------- Shared
import { Link } from 'react-router-dom';
import { ListGroup, TablePagination } from '../../shared';
//#endregion ------------------------------------

//#region --------------------------------------- Module
import MoviesTable from './movies-table';
import SearchBox from '../../shared/form/search-box';
import { moviesService, genresService } from '../../services';
//#endregion ------------------------------------

class Movies extends Component {

    //#region ----------------------------------- Variables
    movies = [];
    genres = [];
    pageSize = 5;
    state = {
        movies: [],
        totalCount: 0,
        pageSize: this.pageSize,
        activePageNumber: 1,
        query: "",
        selectedGenre: null,
        sort: { path: 'title', order: 'asc' },
        liked: [],
        deleted: []
    }
    //#endregion --------------------------------

    //#region ----------------------------------- Lifecycle
    async componentDidMount() {
        const genres = await genresService.getGenres();
        const query = queryString.parse(this.props.location.search);
        const queryGenre = genres.find((genre) => query.genre && genre.name.toLowerCase() === query.genre.toLowerCase());
        const selectedGenre = queryGenre ? queryGenre : genres[0];
        const result = await moviesService.searchMovies(1, this.pageSize, selectedGenre._id);

        this.setState({
            movies: result.movies,
            totalCount: result.totalCount,
            genres: genres,
            selectedGenre: selectedGenre
        });
    }

    render() {
        const { movies, totalCount, genres, selectedGenre, activePageNumber, pageSize, sort, query } = this.state;
        const { user } = this.props;

        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup selectedItem={selectedGenre} items={genres} onItemSelect={(item) => this.handleGenreSelect(item)} />
                </div>
                <div className="col-8">
                    {
                        user && user.isAdmin &&
                        <Link className="btn btn-primary" to="/movies/new">New Movie</Link>
                    }
                    <SearchBox className="my-4" onChange={(e) => this.handleSearch(e)} value={query} />
                    {
                        (!movies || !movies.length) ?
                            (<p>No movies in the database</p>) :
                            (
                                <React.Fragment>
                                    <MoviesTable totalCount={totalCount} sort={sort} movies={movies} onSort={(sort) => this.handleSort(sort)} onLike={(movie) => this.handleLike(movie)} onDelete={(movie) => this.handleDelete(movie)} />
                                    <TablePagination pageSize={pageSize} totalCount={totalCount} activePageNumber={activePageNumber} onPageChange={(page) => this.handlePageChange(page)} />
                                </React.Fragment>
                            )
                    }
                </div>
            </div >

        );
    }
    //#endregion --------------------------------

    //#region ----------------------------------- Handlers
    async handleSearch(query) {
        const newState = { query, selectedGenre: null, currentPage: 1 };
        const { movies, totalCount } = await this.searchMovies(newState);
        this.setState({ ...newState, movies, totalCount });
    }
    async handleSort(sort) {
        const { movies, totalCount } = await this.searchMovies({ sort });
        this.setState({ movies, totalCount, sort });
    }
    async handleGenreSelect(selectedGenre) {
        this.props.history.push({ search: `?genre=${selectedGenre.name.toLowerCase()}` });
        const { movies, totalCount } = await this.searchMovies({ selectedGenre, activePageNumber: 1 });
        this.setState({ movies, totalCount, selectedGenre, activePageNumber: 1 });
    }
    async handlePageChange(activePageNumber) {
        const { movies, totalCount } = await this.searchMovies({ activePageNumber });
        this.setState({ movies, totalCount, activePageNumber });
    }
    async handleDelete(movie) {
        await moviesService.deleteMovie(movie._id);
        const { movies, totalCount } = await this.searchMovies();
        this.setState({ movies, totalCount });
    }
    async handleLike(movie) {
        await moviesService.toggleLikeMovie(movie);
        const { movies, totalCount } = await this.searchMovies();
        this.setState({ movies, totalCount });
    }
    async searchMovies(newState) {
        const { selectedGenre, activePageNumber, pageSize, sort, liked, deleted, query } = { ...this.state, ...newState };
        const { movies, totalCount } = await moviesService.searchMovies(activePageNumber, pageSize, selectedGenre?._id, sort, liked, deleted, query);
        return { movies, totalCount };
    }
    //#endregion --------------------------------
}

export default Movies;