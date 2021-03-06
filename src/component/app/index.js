import './app.scss';

import React from 'react';
import { connect } from 'react-redux';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import * as util from '../../lib/util.js';
import * as auth from '../../action/auth';
import * as route from '../../action/route';
import { Provider } from 'react-redux';
import harvey from '../asset/harvey_birdman_wii.jpg';

import LandingContainer from '../landing-container';
import CalendarContainer from '../calendar-container';
import SignupContainer from '../signup-container';
import SigninContainer from '../signin-container';

class App extends React.Component {
  componentDidMount() {
    let token = util.cookieFetch('X-Casehawk-Token');
    if (token) this.props.signin(token);
  }

  render() {
    return (
      <div className="app">
        <header>
          <img src={harvey} />
          <h1> CASEHAWK </h1>
          {util.renderIf(
            this.props.token,
            <div className="menu">
              <button className="logout" onClick={this.props.logout}>
                {' '}logout{' '}
              </button>
            </div>
          )}
        </header>
        <MemoryRouter>
          <Switch location={{ pathname: this.props.route }}>
            <Route path="/calendar" component={CalendarContainer} />
            <Route path="/landing" component={LandingContainer} />
            <Route path="/signup" component={SignupContainer} />
            <Route path="/signin" component={SigninContainer} />
          </Switch>
        </MemoryRouter>
      </div>
    );
  }
}

let mapStateToProps = state => ({
  token: state.token,
  route: state.route,
});

let mapDispatchToProps = dispatch => ({
  logout: () => dispatch(auth.logout()),
  signin: token => dispatch(auth.signin(token)),
  goToCalendar: () => dispatch(route.switchRoute('/calendar')),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
