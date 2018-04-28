import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './index.less'
import { Form, Input, Button , Icon,message } from 'antd';
import hashHistroy from 'history/createHashHistory';
import classnames from 'classnames';
import UserContent from '../routes/user'

const FormItem = Form.Item;
const history = hashHistroy();

export default class UnverifiedLayout extends Component {

    static propTypes = {
        prevStepClick: PropTypes.func,
        confirmClick: PropTypes.func,
        drawCanvasFun: PropTypes.func
    }

    state = {
        isShowCanvas: true
    }

    componentWillMount(){
        const { drawCanvasFun } = this.props
        if (!drawCanvasFun) {
            this.setState({
                isShowCanvas:false
            })
        }
    }

    componentDidMount(){
        if (this.state.isShowCanvas) {
            this.props.drawCanvasFun()
        }
    }

    render() {
        const {submitting,getFieldDecorator, isShowCanvas, children} = this.props;
        return <React.Fragment>
            <div className={style.authLayout}>
                { isShowCanvas &&  <canvas id="authLayout">  </canvas> }
            </div>
            <UserContent  />
        </React.Fragment>
    }
}