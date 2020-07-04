import React from 'react';

const SearchBox = (props) => {
    const { value, onChange, className } = props;

    return (
        <input
            type="text"
            label="Search"
            placeholder="Search..."
            name="query"
            value={value}
            className={"form-control " + className}
            onChange={e => onChange(e.currentTarget.value)}
        />
    );
}
export default SearchBox;