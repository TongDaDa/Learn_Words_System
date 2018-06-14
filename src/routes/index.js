import React,{Component} from 'react';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {LocaleProvider} from 'antd'
import {Provider} from 'react-redux';
import {HashRouter,Switch,Route} from 'react-router-dom';
import AuthorityRoute from 'utils/AuthorityRender'
import UserLayout from '../Layouts/UserLayout'
import UnverifiedLayout from '../Layouts/UnverifiedLayout'

const AuthorizedRoute = AuthorityRoute.AuthorizedRoute;

export default ({store,app})=>(
    <Provider store={store}>
        <LocaleProvider locale={zhCN}>
            <HashRouter>
                <Switch>
                    <AuthorizedRoute
                        path="/user"
                        key="userAuthorizedRoute"
                        authority={['guest']}
                        component={props => <UserLayout app={app} {...props} />}
                        redirectPath='/login'
                    />
                    <AuthorizedRoute
                        path="/register"
                        key="registerAuthorizedRoute"
                        authority={['admin','visitor','guest']}
                        render={ props => <UnverifiedLayout {...props} />}
                        redirectPath='/404'
                    />
                    <AuthorizedRoute
                        path="/login"
                        key="loginAuthorizedRoute"
                        authority={['admin','visitor']}
                        render={ props => <UnverifiedLayout {...props} />}
                        redirectPath='/register'
                    />
                </Switch>
            </HashRouter>
        </LocaleProvider>
    </Provider>
)