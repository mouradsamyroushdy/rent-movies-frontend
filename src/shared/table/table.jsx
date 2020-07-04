import React from 'react';
import TableHeader from './table-header';
import TableBody from './table-body';
import PropTypes from 'prop-types';

const Table = (props) => {
    const { columns, data, onSort, onDelete, onLike, sort } = props;
    return (
        <table className="table">
            <TableHeader sort={sort} columns={columns} onSort={(sort) => onSort(sort)} />
            <TableBody data={data} columns={columns} onDelete={(movie) => onDelete(movie)} onLike={(movie) => onLike(movie)} />
        </table>
    );
}
TableHeader.propTypes = {
    sort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
    columns: PropTypes.array.isRequired,
};
export default Table;