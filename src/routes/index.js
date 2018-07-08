import React,{Component} from 'react';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {LocaleProvider} from 'antd'
import {Provider} from 'react-redux';
import {HashRouter,Switch,Route} from 'react-router-dom';
//注: here have a request of authority
import AuthorityRoute from 'utils/AuthorityRender'
import UserLayout from '../Layouts/UserLayout'
import UnverifiedLayout from '../Layouts/UnverifiedLayout'
import {app} from '../main'

const AuthorizedRoute = AuthorityRoute.AuthorizedRoute;

const modelCatchMap = []

/**
 * @param namespace {Stirng || Array[String]}
 */
const bindModel = (namespace) => {

    const bind = (namespace) => {
        const getModel = require(`../model/${namespace}`).default;
        const model = getModel(namespace)
        if (!~modelCatchMap.indexOf(namespace)) {
            app.model(model)
            modelCatchMap.push(namespace);
        }
    }

    if (Array.isArray(namespace)) {
        namespace.forEach((namespace) => {
            bind(namespace)
        })
        return;
    }

    bind(namespace);

}

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
                        cb={() => { bindModel(["userLayout","login"], modelCatchMap) }}
                    />
                    <AuthorizedRoute
                        path="/login"
                        exact={true}
                        key="loginAuthorizedRoute"
                        authority={['admin','visitor']}
                        render={ props => <UnverifiedLayout {...props} />}
                        redirectPath='/exception/404'
                        cb={() => { bindModel("login", modelCatchMap) }}
                    />
                </Switch>
            </HashRouter>
        </LocaleProvider>
    </Provider>
)