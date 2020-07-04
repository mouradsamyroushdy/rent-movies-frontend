import React from 'react'
import PropTypes from 'prop-types';
import SortIcon from '../sort-icon';

const TableHeader = (props) => {
    const { columns, sort, onSort } = props;
    function raiseSort(path) {
        const order = (sort && path === sort.path) ? (sort.order === 'asc' ? 'desc' : 'asc') : 'asc';
        onSort({ path: path, order: order });
    }
    return (
        <thead>
            <tr>
                {
                    columns.map((column) => {
                        const { path, title, key } = column;
                        let result;
                        if (title)
                            result = <th key={key || path} className="cursor-pointer" onClick={() => raiseSort(path)}>
                                <span>{title}</span>
                                <SortIcon sort={sort} path={path} />
                            </th>;
                        else
                            result = <th key={key || path}></th>;
                        return result;
                    })
                }
            </tr>
        </thead >
    );
}
TableHeader.propTypes = {
    sort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
    columns: PropTypes.array.isRequired,
};
export default TableHeader;