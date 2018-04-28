import React,{Component} from 'react';
import store from 'store';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {LocaleProvider} from 'antd'
import {Provider} from 'react-redux';
import {HashRouter,Switch,Route} from 'react-router-dom';
import AuthorityRoute from 'utils/AuthorityRender'
import UserLayout from '../Layouts/UserLayout'
import UnverifiedLayout from '../Layouts/UnverifiedLayout'

const AuthorizedRoute = AuthorityRoute.AuthorizedRoute;
console.log(AuthorizedRoute);

export default ()=>(
    <Provider store={store}>
        <LocaleProvider locale={zhCN}>
            <HashRouter>
                <Switch>
                    <AuthorizedRoute
                        path="/user"
                        authority={['guest']}
                        render={props => <UserLayout {...props} />}
                        redirectPath='/login'
                    />
                    <AuthorizedRoute
                        path="/login"
                        authority={['admin','visitor']}
                        render={ props => <UnverifiedLayout {...props} />}
                        redirectPath='/extension/404'
                    />
                </Switch>
            </HashRouter>
        </LocaleProvider>
    </Provider>
)