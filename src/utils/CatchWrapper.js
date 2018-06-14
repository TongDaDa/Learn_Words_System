import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ErrorPage from 'com/ErrorPage'

export default class ErrorWrapper extends Component {

    static propTypes = {}

    state = { isError: false, errInfo:null }

    componentDidCatch(errInfo){
        this.setState({
            isError: true,
            errInfo: errInfo
        })
    }

    render() {
        return this.state.isError ? <ErrorPage {...this.props} errorInfo={this.state.errInfo} /> : this.props.children
    }
}