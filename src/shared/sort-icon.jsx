import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
const SortIcon = (props) => {
    const { sort, path } = props;
    return (
        <FontAwesomeIcon
            className={sort.path === path ? '' : 'd-none'}
            icon={sort.order === 'asc' ? faSortUp : faSortDown}
        />
    );
}

export default SortIcon;