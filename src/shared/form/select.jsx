import React from 'react';
import PropTypes from 'prop-types';

const Select = (props) => {
    const { options, error, name, label, ...rest } = props;

    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select {...rest} name={name} className="form-control">
                <option value=""></option>
                {options.map(option => (
                    <option key={option._id} value={option._id}>{option.name}</option>
                ))}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}
Select.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
}
export default Select;