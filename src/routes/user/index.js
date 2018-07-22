import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LoginCom from './login'
import ForgoPas from './forgotPas'
import Register from './register'
import style from './index.module.scss'
import classnames from 'classnames'

export default class UserLayout extends Component {
    static propTypes = {}
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <React.Fragment>
            <div className={style.userLayoutWrapper}>
                <div className={classnames([style.login,style.userAuthorityContainer])}>
                    <LoginCom />
                    {/*<ForgoPas />*/}
                </div>
            </div>
        </React.Fragment>
    }
}