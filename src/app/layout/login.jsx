import React from 'react';
import { Input } from '../../shared';
import Joi from 'joi-browser';
import Form from '../../shared/form/form';
import { authService } from '../../services';
import httpService from '../../services/http-service';
import { Redirect } from 'react-router-dom';

class Login extends Form {
    schema = {
        username: Joi.string().required().label("UserName"),
        password: Joi.string().required().label("Password"),
    };
    state = {
        data: { username: "", password: "" },
        errors: {}
    };
    async submit() {
        const { username, password } = this.state.data;
        try {
            await authService.login(username, password);
            const { state } = this.props.location;
            window.location = state ? state.from.pathname : '/';
        } catch (ex) {
            if (httpService.is400Ex(ex)) {
                const errors = { ...this.state.errors };
                errors.form = ex.response.data;
                this.setState({ errors });
            }
        }
    }

    render() {
        if (authService.getCurrentUser()) {
            return <Redirect to='/' />
        }

        const { data } = this.state;
        return (
            <div>
                <h1>Login</h1>
                <form action="">
                    <Input value={data.username} onChange={(e) => this.handleChange(e)} name="username" label="User Name" id="username" error={this.state.errors?.username} />
                    <Input value={data.password} onChange={(e) => this.handleChange(e)} name="password" label="Password" id="password" type="password" error={this.state.errors?.password} />

                    {this.state.errors?.form && <div className="alert alert-danger">{this.state.errors.form}</div>}

                    <button disabled={this.validate()} className="btn btn-primary mr-4" onClick={(e) => this.handleSubmit(e)}>Login</button>
                    <button className="btn btn-danger" onClick={(e) => this.handleClear(e)}>Clear</button>
                </form>
            </div>
        );
    }
}

export default Login;