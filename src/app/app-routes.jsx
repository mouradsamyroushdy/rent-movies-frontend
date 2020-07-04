import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { NotFound } from '../shared';
import { Login, Register } from './layout';
import { NewMovie, Movies } from './movies';
import ProtectedRoute from '../shared/protected-route';

const AppRoutes = (props) => {
    return (
        <Switch>
            <Route path="/login" render={(innerProps) => <Login {...innerProps} />} />
            <Route path="/register" render={(innerProps) => <Register {...innerProps} />} />
            <ProtectedRoute path="/movies/:id" component={NewMovie} />
            <Route path="/movies" render={(innerProps) => <Movies {...innerProps} user={props.user} />} />
            <Route path="/no-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/no-found" />
        </Switch>
    );
}

export default AppRoutes;