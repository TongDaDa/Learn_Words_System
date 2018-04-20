import React,{Component} from 'react';

const ReactRendeing = (lazyComponent,loadingComponent)=>(
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
                console.error(res);
            })
        }
        render(){
            const Com = this.LazyComponent;
            return <Com {...this.props} />
        }
    }
)

const Word = ()=>import(/* webpackChunkName: "manage_word" */ "../pages/manageWord");
const Essay = ()=>import(/* webpackChunkName: "manage_essay" */ '../pages/manageEssay');
const Root = ()=>import(/* webpackChunkName: "manage_essay" */ '../pages/manageRoot');
const LearnPlan = ()=>import(/* webpackChunkName: "manage_learn_plan" */ '../pages/manageLearnPlan');

import NotFound500 from "./Exception/500";
import NotFound403 from "./Exception/403";
import NotFound404 from "./Exception/404";

export default [
    {name:"单词管理",component:ReactRendeing(Word),path:"/base/manage_word",isExact:true},
    {name:"文章管理",component:ReactRendeing(Essay),path:"/base/essay",isExact:true},
    {name:"词根管理",component:ReactRendeing(Root),path:"/base/root",isExact:true},
    {name:"学习计划管理",component:ReactRendeing(LearnPlan),path:"/base/learnPlan",isExact:true},

    {name: '异常页面-500', component: NotFound500, path:"exception/500"},
    {name: '异常页面-403', component: NotFound403, path:"exception/403"},
    {name: '异常页面-404', component: NotFound404, path:"exception/404"}
];