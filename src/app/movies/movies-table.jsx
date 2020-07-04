//#region --------------------------------------- React
import React from 'react'
//#endregion ------------------------------------

//#region --------------------------------------- 3rd-Parties
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import _ from 'lodash';
//#endregion ------------------------------------

//#region --------------------------------------- Shared
import { Table, Like } from '../../shared';
import { authService } from '../../services';
//#endregion ------------------------------------

const MoviesTable = (props) => {
    const { totalCount, movies, sort, onLike, onDelete, onSort } = props;
    const columns = [
        {
            key: 'title',
            path: 'title',
            title: 'Title',
            content: ({ _id, title }) => {
                const link = `/movies/${_id}`;
                return <Link to={link} >{title}</Link>
            }
        },
        { path: 'genre.name', title: 'Genre' },
        { path: 'numberInStock', title: 'Stock' },
        { path: 'dailyRentalRate', title: 'Rate' },
        {
            key: 'like', content: movie => <Like liked={movie.liked} onClick={() => onLike(movie)} />
        },
        {
            key: 'delete', content: movie =>
                <button title="Delete" onClick={() => onDelete(movie)} className="btn btn-danger btn-sm">
                    <FontAwesomeIcon icon={faTrash} />
                </button>
        },
    ];
    const user = authService.getCurrentUser();
    if (!user || !user.isAdmin) {
        _.remove(columns, column => column.key === 'delete')
    }

    return (
        <div>
            <p>Showing {totalCount} movies in the database.</p>
            <Table data={movies} sort={sort} columns={columns} onSort={(sort) => onSort(sort)} onDelete={(movie) => onDelete(movie)} onLike={(movie) => onLike(movie)} />
        </div>
    );
}
MoviesTable.propTypes = {
    onLike: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    movies: PropTypes.array,
    totalCount: PropTypes.number.isRequired,
}
export default MoviesTable;