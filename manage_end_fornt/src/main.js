import ReactDOM from "react-dom";
import React from "react";
import store from 'store';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {LocaleProvider} from 'antd'
import {Provider} from 'react-redux';
import {HashRouter,Route} from 'react-router-dom';
import UserLayout from './Layout';
import './assets/css/global.scss'
import 'antd/lib/style'
import 'antd/lib/style/components.less'

const curPathname = window.location.href;
if (/\/#\/$/.test(curPathname)) {
    history.replaceState({},'','#/base/record')
}

const App = ()=>(
    <Provider store={store}>
        <LocaleProvider locale={zhCN}>
            <HashRouter>
                <Route path='/' render={props=><UserLayout {...props}/>}>
                </Route>
            </HashRouter>
        </LocaleProvider>
    </Provider>
)

ReactDOM.render(<App/>,document.getElementById('root'));
