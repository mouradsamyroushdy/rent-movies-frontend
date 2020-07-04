import React, { Component } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import Input from './input';
import Select from './select';

class Form extends Component {
    state = {
        data: {},
        errors: {}
    };

    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options);

        if (!error) return null;
        const errors = {};
        error.details.forEach(error => errors[error.path[0]] = error.message);
        return errors;
    }

    validateProperty(input) {
        const { name, value } = input;
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors && errors.length) return;
        this.submit();
    }

    handleChange = (event) => {
        const target = event.currentTarget;
        const { name, value } = target;
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(target);
        if (errorMessage) errors[target.name] = errorMessage;
        else delete errors[target.name];

        const data = { ...this.state.data };
        data[name] = value;
        this.setState({ data, errors });
    }
    handleClear = (e) => {
        e.preventDefault();
        const data = this.state.data;
        _.forEach(data, (prop, index) => {
            data[index] = "";
        });
        this.setState({ data, errors: {} });
    }
    renderInput(name, label, type = 'text') {
        const { data } = this.state;
        return (
            <Input
                value={data[name]}
                onChange={(e) => this.handleChange(e)}
                name={name}
                label={label}
                id={name}
                type={type}
                error={this.state.errors[name]} />
        );
    }
    renderSelect(name, label, options) {
        const { errors, data } = this.state;
        return (
            <Select
                options={options}
                value={data[name]}
                onChange={this.handleChange}
                name={name}
                label={label}
                error={errors[name]} />
        );
    }

    renderSubmitButton(label = "Submit") {
        return <button disabled={this.validate()} className="btn btn-primary mr-4" onClick={(e) => this.handleSubmit(e)}>{label}</button>;
    }
}

export default Form;