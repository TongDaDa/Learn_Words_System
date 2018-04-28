import React from 'react';
import CheckPermissions from './CheckPermissions';
import {CURRENT} from './index'

function isPromise(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

class Authorized extends React.Component {
  constructor(){
      super();
      this.state = { CURRENT }
      if (isPromise(CURRENT)) {
          CURRENT.then((currentAuthority) => {
              this.setState({
                  CURRENT: currentAuthority
              })
          })
      }
  }
  render() {
    const { children, authority, noMatch = null } = this.props;
    const childrenRender = typeof children === 'undefined' ? null : children;
    return CheckPermissions(
      authority, this.state.CURRENT,
      childrenRender,
      noMatch
    );
  }
}

export default Authorized;
