import React, {Component} from 'react';
import {Spin} from 'antd';
import createHistory from 'history/createHashHistory'
const history = createHistory();


/**
 * @param lazyComponent {type React Component}
 * @param loadingComponent {type React Component}
 * @param ErrorPage {type Sttring | ReactComponent}
 */
export default (importLazyComponent,LoadingComponent,ErrorPage) => (
    class AnonymComponent extends Component {
        constructor (props) {
            super(props);
            this.state = {
                isLazyLoaded:false,
            }

            const LoadingComponentPro = LoadingComponent || Spin;
            this.LoadingComponent = ()=>(<LoadingComponentPro> loading </LoadingComponentPro>)
            const lazyPromiseComponent = importLazyComponent();

            lazyPromiseComponent.then((e) => {
                if (!e.default || typeof e.default !== 'function') throw ErrorPage("don't load Component")
                this.LazyComponent = e.default;
                this.setState({ isLazyLoaded:true })
            }).catch((res)=> {
                console.warn('loaded page error:',res)
                if (typeof ErrorPage === 'string') {
                    history.replace(ErrorPage)
                } else {
                    this.LoadingComponent = <ErrorPage />;
                    this.setState({ isLazyLoaded:true })
                }
            })

        }

        render(){
            return this.state.isLazyLoaded ? <this.LazyComponent {...this.props} /> : <this.LoadingComponent {...this.props} />
        }
    }
)