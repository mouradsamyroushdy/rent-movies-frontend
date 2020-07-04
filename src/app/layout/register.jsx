import React from 'react';
import { Input } from '../../shared';
import Joi from 'joi-browser';
import Form from '../../shared/form/form';
import { httpService, usersService, authService } from '../../services';
class Register extends Form {
    schema = {
        username: Joi.string().email().required().label("UserName").regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        password: Joi.string().min(8).max(16).required().label("Password"),
        name: Joi.string().required().label("Name"),
    };
    state = {
        data: { username: "", password: "", name: "" },
        errors: {}
    };
    async submit() {
        try {
            const token = await usersService.register(this.state.data);
            authService.loginWithToken(token);
            window.location = "/";
        } catch (ex) {
            if (httpService.is400Ex(ex)) {
                const errors = { ...this.state.errors };
                errors.form = ex.response.data;
                this.setState({ errors });
            }
        }
    }

    componentDidMount() {
        if (authService.getCurrentUser()) {
            this.props.history.replace('/');
        }
    }

    render() {
        const { data } = this.state;
        return (
            <div>
                <h1>Register</h1>
                <form action="">
                    <Input value={data.username} onChange={(e) => this.handleChange(e)} name="username" label="User Name" id="username" error={this.state.errors?.username} />
                    <Input value={data.password} onChange={(e) => this.handleChange(e)} name="password" label="Password" id="password" type="password" error={this.state.errors?.password} />
                    <Input value={data.name} onChange={(e) => this.handleChange(e)} name="name" label="Name" id="name" error={this.state.errors?.name} />

                    {this.state.errors?.form && <div className="alert alert-danger">{this.state.errors.form}</div>}

                    <button disabled={this.validate()} className="btn btn-primary mr-4" onClick={(e) => this.handleSubmit(e)}>Register</button>
                    <button className="btn btn-danger" onClick={(e) => this.handleClear(e)}>Clear</button>
                </form>
            </div>
        );
    }
}

export default Register;