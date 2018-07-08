import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button , Icon, message } from 'antd';
import hashHistroy from 'history/createHashHistory';
import classnames from 'classnames';
import style from '../index.module.scss'

const FormItem = Form.Item;

@Form.create()
export default class ForgotPas extends Component {

    static propTypes = {
        prevStepClick: PropTypes.func,
        confirmClick: PropTypes.func,
        submitting: PropTypes.bool
    }

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {form,submitting,confirmClick} = this.props;
        const {getFieldDecorator, handleSubmit, handleForgotPasClick} = form;
        return <React.Fragment>
            <Form onSubmit={confirmClick}>
                <FormItem>
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, pattern:/^1(3|4|5|7|8)\d{9}$/, message: "手机号格式错误，请重新输入" }],
                    })(
                        <Input prefix={<Icon type="mobile" />} type="phone" maxLength="11" placeholder="请输入您注册的手机号码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('code', {
                        rules: [{ required: true, pattern:/^\d{6}$/, message: "请输入6位纯数字验证码" }],
                    })(
                        <Input prefix={<Icon type="mail"/>} className={style.forgot_captchaInput} placeholder="验证码" />
                    )}

                    <Button disabled={!!this.captchaInterval} className={classnames({[style.forgot_getCaptcha]:true,[style.forgot_getCaptchaing]:!!this.captchaInterval})}
                            onClick={this.getCaptcha}>
                        {
                            this.captchaInterval ? `${intervalTime} 秒后重新获取` :
                                "获取验证码"
                        }
                    </Button>
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, pattern:/^[\S]*$/, message: "密码格式错误" }],
                    })(
                        <Input prefix={<Icon type="lock"/> } type="password" placeholder="请输入新密码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('confimPassword', {
                        rules: [{ required: true, message: "两次密码不一致" },{
                            validator: this.checkPassword,
                        }],
                    })(
                        <Input prefix={<Icon type="lock"/>} type="password" placeholder="请确认新密码" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" loading={submitting} htmlType="submit" onClick={this.confimClick} className={style.forgot_confim}>
                        确认修改
                    </Button>
                </FormItem>
                <FormItem style={{marginBottom:0}}>
                    <Button htmlType="submit" onClick={this.prevStepClick} className={style.forgot_confim}>
                        返回
                    </Button>
                </FormItem>
            </Form>
        </React.Fragment>
    }
}