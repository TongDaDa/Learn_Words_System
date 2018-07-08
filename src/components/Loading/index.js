import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './index.module.less';

export default class Loading extends Component {

    static propTypes = {}

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { isAllScreen } = this.props;
        return <React.Fragment>
            <div className={classnames({[style.football]:true,[style.allScreen]: isAllScreen})}>
                <div className={style.ball}></div>
                <div className={style.shadow}></div>
                <p>Now Loading ...</p>
            </div>
        </React.Fragment>
    }
}