import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classes from 'component-classes';
import { Form, Icon, Input, Button, message } from 'antd';
import {password} from 'utils/pattern'
import {omit} from 'utils/util';
const FormItem = Form.Item;
import {reqLogin} from 'services/user'
import createHistory from 'history/createHashHistory'
import VerifyCode from 'utils/verficationCode'
import style from '../index.module.scss'

const history = createHistory();

@Form.create()
export default class Login extends Component {

    static propTypes = {
        pattern: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {}
    }

    FindOutPasClick = () => {}

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ logining: true })
        this.props.form.validateFields((err,values) => {
            if (err) return
            reqLogin(values).then(res => {
                if (res.errorCode === '0') {
                    window.location.replace('/')
                }
            }).catch(() => { this.setState({ logining:false }) })
        })
    }

    render() {

        const {logining} = this.state;
        const {getFieldDecorator, handleForgotPasClick} = this.props.form;

        const wrpperCols = {
            labelCol: { span: 6 },
            wrapperCol:{span: 18 }
        }

        return <React.Fragment>
                <Form onSubmit={this.handleSubmit} className={style.form}>
                    <FormItem label="账号" {...wrpperCols}>
                        {getFieldDecorator('account', {
                            rules: [
                                {required: true, message: '请输入用户名'},
                                {pattern: /^1{1}\d{10}$/, message: '请检查用户名格式'},
                            ],
                        })(
                            <Input prefix={<Icon type="user" style={{fontSize: 16}}/>} placeholder="用户名"/>
                        )}
                    </FormItem>
                    <FormItem label="密码" {...wrpperCols}>
                        {getFieldDecorator('password', {
                            rules: [{required: true, pattern: password, message: '密码格式错误'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{fontSize: 16}}/>} type="password" placeholder="密码"/>
                        )}
                    </FormItem>
                    {/*<FormItem className="clear" label="验证码" {...wrpperCols}>*/}
                        {/*<div className="clear">*/}
                            {/*<div className="verify_code_test left">*/}
                                {/*{getFieldDecorator('verifyText', {*/}
                                    {/*rules: [{required: true, pattern: password, message: '验证码输入错误'}],*/}
                                {/*})(*/}
                                    {/*<Input placeholder="请输入验证码" maxLength="4"/>*/}
                                {/*)}*/}
                            {/*</div>*/}
                            {/*<div id="verify_code" className="right">  </div>*/}
                        {/*</div>*/}
                    {/*</FormItem>*/}
                    <div className={style.regsiter}>
                        <a href=":javascript;" onClick={this.FindOutPasClick} > 忘记密码? </a>
                        <a href=":javascript;"> 去注册? </a>
                    </div>
                    <FormItem style={{marginBottom: 0}}>
                        <Button type="primary" htmlType="submit" loading={logining} className={style['login-form-button']}>
                            登录
                        </Button>
                    </FormItem>
                </Form>
        </React.Fragment>
    }
}