import React, {Component} from 'react';
export default ReactRendering = (lazyComponent,loadingComponent)=>(
    class AnonymComponent extends Component {
        constructor (props) {
            super(props);
            this.state = {
                isLazyLoaded:false
            }
            this.LazyComponent = ()=>(<div />);
            const lazyPromiseComponent = lazyComponent();
            lazyPromiseComponent.then((e)=>{
                if (e.default) {
                    this.LazyComponent = e.default;
                    this.setState({
                        isLazyLoaded:true
                    })
                }
            }).catch((res)=>{

            })
        }
        render(){
            return <this.LazyComponent {...this.props} />
        }
    }
)