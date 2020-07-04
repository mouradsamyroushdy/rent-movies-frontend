import React from 'react'
import './table-pagination.scss';
import _ from 'lodash';
import PropTypes from 'prop-types';

const TablePagination = (props) => {
    //#region ----------------------------------- Variables
    const { activePageNumber, totalCount, pageSize, onPageChange } = props;
    const pagesCount = Math.ceil(totalCount / pageSize);
    const pagesNumbers = _.range(1, pagesCount + 1);
    //#endregion --------------------------------

    //#region ----------------------------------- Methods
    const getPageCssClasses = (pageNumber) => {
        const base = "page-item cursor-pointer";
        return (pageNumber === activePageNumber ? 'active ' : '') + base;
    }
    //#endregion --------------------------------

    //#region ----------------------------------- Lifecycle
    return (
        <nav className="d-flex align-items-center justify-content-between">
            <ul className="pagination">
                <li className="page-item cursor-pointer" disabled={activePageNumber === 1} onClick={() => onPageChange(activePageNumber - 1)}>
                    <button className="page-link">Previous</button>
                </li>
                {
                    pagesNumbers.map((pageNumber) =>
                        <li key={pageNumber} disabled={activePageNumber === pageNumber} className={getPageCssClasses(pageNumber)} onClick={() => onPageChange(pageNumber)}>
                            <button className="page-link">{pageNumber}</button>
                        </li>
                    )
                }
                <li className="page-item cursor-pointer" disabled={activePageNumber === pagesCount} onClick={() => onPageChange(activePageNumber + 1)}>
                    <button className="page-link">Next</button>
                </li>
            </ul>
            <span>Total items {(activePageNumber * pageSize) > totalCount ? totalCount : (activePageNumber * pageSize)} of {totalCount}</span>
        </nav>
    );
    //#endregion --------------------------------
}


TablePagination.propTypes = {
    activePageNumber: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
}

export default TablePagination;