import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authService } from '../services';

const ProtectedRoute = (props) => {
    const { component: Component, render, ...rest } = props;
    return (

        <Route
            {...rest}
            render={
                (innerProps) => {
                    if (!authService.getCurrentUser())
                        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                    else
                        return Component ? <Component {...innerProps} /> : render(innerProps);
                }
            }
        />
    )
}

export default ProtectedRoute;