import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
    const { error, name, label, ...rest } = props;

    return (
        <div className="form-group">
            {label && <label htmlFor={name}>{label}</label>}
            <input {...rest} name={name} className="form-control" />

            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}
Input.defaultProps = {
    type: 'text',
}
Input.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    type: PropTypes.string.isRequired,
}
export default Input;