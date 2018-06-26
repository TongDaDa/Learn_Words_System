import React,{Component} from 'react';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {LocaleProvider} from 'antd'
import {Provider} from 'react-redux';
import {HashRouter,Switch,Route} from 'react-router-dom';

//注: here have a request of authority
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
                        path="/"
                        key="baseAuthority"
                        authority={['guest',"admin"]}
                        exact={true}
                        to="/user"
                        redirectPath='/login'
                    />
                    <AuthorizedRoute
                        path="/user"
                        key="userAuthorizedRoute"
                        authority={['guest',"admin"]}
                        component={props => <UserLayout app={app} {...props} />}
                        redirectPath='/login'
                    />
                    <AuthorizedRoute
                        path="/login"
                        exact={true}
                        key="loginAuthorizedRoute"
                        authority={['admin','visitor']}
                        render={ props => <UnverifiedLayout {...props} />}
                        redirectPath='/exception/404'
                    />
                </Switch>
            </HashRouter>
        </LocaleProvider>
    </Provider>
)