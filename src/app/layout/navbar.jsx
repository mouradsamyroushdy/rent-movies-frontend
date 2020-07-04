import React from 'react'
import { NavLink } from 'react-router-dom';
import { authService } from '../../services';

function Navbar(props) {
    const { user } = props;

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="navbar-nav">
                    <NavLink className="nav-link nav-item" to="/">Home</NavLink>
                    <NavLink className="nav-link nav-item" to="/movies">Movies</NavLink>
                    <NavLink className="nav-link nav-item" to="/customers">Customers</NavLink>
                    <NavLink className="nav-link nav-item" to="/rentals">Rentals</NavLink>
                </div>
                <div className="navbar-nav ml-auto nav-flex-icons">
                    {
                        !user &&
                        (<React.Fragment>
                            <NavLink className="nav-link nav-item" to="/login">Login</NavLink>
                            <NavLink className="nav-link nav-item" to="/register">Register</NavLink>
                        </React.Fragment>)
                    }

                    {
                        user &&
                        (
                            <React.Fragment>
                                <a href="#" onClick={(e) => handleLogout(e)} className="nav-link nav-item">Logout</a>
                                <div className="user-profile">
                                    <span className="name">{user.name}</span>
                                    <span className="icon"></span>
                                </div>
                            </React.Fragment>
                        )
                    }
                </div>
            </div>
        </nav >
    );

    function handleLogout(e) {
        e.preventDefault();
        authService.logout();
        window.location = "/";
    }
}

export default Navbar;