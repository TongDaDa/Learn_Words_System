import ReactDOM from "react-dom";
import React from "react";
import Routes from './routes'
import './assets/css/global.scss'
import 'antd/lib/style'
import 'antd/lib/style/components.less'
import {create} from 'dva-core'

const app = create({},{})

app.start();

ReactDOM.render( <Routes store={app._store} app={app}/>, document.getElementById('root'));
