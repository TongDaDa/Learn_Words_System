import React from 'react';
import PropTypes from 'prop-types';
import {Link,Switch,Route,Redirect} from 'react-router-dom';
import Authorized from './Authorized';

class AuthorizedRoute extends React.Component {
  static PropTypes = {
    to: PropTypes.string
  }
  render() {
    const { component: Component, render, authority, to : toPath,
      redirectPath, cb, ...rest } = this.props;
      return (
      <Authorized
        authority={authority}
        noMatch={<Route {...rest} render={() => <Redirect to={{ pathname: redirectPath }} />} />}
      >
          {
              toPath ? <Redirect to={{ pathname: toPath }} /> :
                  <Route
                    {...rest}
                    render={ props => {
                      cb && cb();
                      return (Component ? <Component {...props} /> : render(props))
                    } }
                  />
          }
      </Authorized>
    );
  }
}

export default AuthorizedRoute;
