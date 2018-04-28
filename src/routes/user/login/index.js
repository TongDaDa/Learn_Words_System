import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classes from 'component-classes';
import { Form, Icon, Input, Button, message } from 'antd';
import {password} from 'utils/pattern'
import {omit} from 'utils/util';
const FormItem = Form.Item;
import VerifyCode from 'utils/verficationCode'
import style from '../index.scss'

@Form.create()
export default class Login extends Component {

    static propTypes = {
        pattern: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        const {getFieldDecorator, handleSubmit, handleForgotPasClick} = this.props.form;

        return <React.Fragment>
                <Form onSubmit={handleSubmit}>
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{required: true, message: '用户名格式错误'}],
                        })(
                            <Input size="large" prefix={<Icon type="user" style={{fontSize: 16}}/>} placeholder="用户名"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{required: true, pattern: password, message: '密码格式错误'}],
                        })(
                            <Input size="large" prefix={<Icon type="lock" style={{fontSize: 16}}/>} type="password" placeholder="密码"/>
                        )}
                    </FormItem>
                    <FormItem className="clear">
                        <div className="clear">
                            <div className="verify_code_test left">
                                {getFieldDecorator('verifyText', {
                                    rules: [{required: true, pattern: password, message: '验证码输入错误'}],
                                })(
                                    <Input size="large" placeholder="请输入验证码" maxLength="4"/>
                                )}
                            </div>
                            <div id="verify_code" className="right">  </div>
                        </div>
                    </FormItem>
                    <FormItem style={{marginBottom: 0}}>
                        <Button type="primary" size="large" htmlType="submit" loading={false} className={style['login-form-button']}>
                            忘记密码
                        </Button>
                        <Button type="primary" size="large" htmlType="submit" loading={false} className={style['login-form-button']}>
                            登录
                        </Button>
                    </FormItem>
                </Form>
        </React.Fragment>
    }
}