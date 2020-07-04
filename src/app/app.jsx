import React, { Component } from 'react';
import { Navbar } from './layout';
import AppRoutes from './app-routes';
import { authService } from '../services';
import './app.scss';

class App extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    const user = authService.getCurrentUser();
    this.setState({ user });
  }


  render() {
    return (
      <React.Fragment>
        <Navbar user={this.state.user} />
        <div className="container">
          <AppRoutes user={this.state.user} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
