import ReactDOM from "react-dom";
import React from "react";
import Routes from './routes'
import './assets/css/global.scss'
import 'antd/lib/style'
import 'antd/lib/style/components.less'

// if (/\/#\/$/.test(curPathname)) {
//     history.replaceState({},'','#/base/record')
// }


const {o: Componen} = {o:12}
ReactDOM.render(<Routes />,document.getElementById('root'));
