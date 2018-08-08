import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Table, Menu,message,Modal,Select,Spin,Switch } from "antd"
import {reqRootList,reaSaveRoot,reqDelRoot,reqGetRootModal, reqDelroot, reqSaveRoot} from 'services/api'
import style from './style.module.scss';
import {addRowsKey,omit,splitObject} from 'utils/util'
import {connect} from 'react-redux'

const FormItem = Form.Item;
const Textarea = Input.TextArea;

@connect(state=>({...state,name:'liutong'}))
@Form.create()
export default class ManageWord extends Component {

    static propTypes = {};

    constructor(props) {
        super(props);
        this.modalFields = ["modal_word","modal_root","modal_note","modal_example"];
        this.state = {
            tableLoading: true,
            tableData: [],
            isCarryHeaderForm: false, //当前是否处于搜索条件中
            visibleModal:false,
            headerSearchCatch: { root: '', pageSize:10, pageNum:1 },
            curModalOpenText:"",
            currentHandleId:null,
            isShowAddRelationWord:false, //是否显示相关单词
            paginationOption:{
                current:1,
                total:0,
            },
        }
    }

    componentDidMount () { this.reqTableList() }

    columns = [
        {
            title: 'root',
            dataIndex: 'root',
            key: 'root',
            fixed:'left'
        },{
            title: 'note',
            dataIndex: 'note',
            key: 'note'
        },{
            title: 'relationWord',
            dataIndex: 'relationWord',
            key: 'relationWord'
        },{
            title: 'handle',
            dataIndex: 'handle',
            key: 'handle',
            render:(i,record)=> <span>
                <a onClick={()=>{this.edit(record.id)}}> 编辑 </a>
                <a onClick={()=>{this.del(record.id)}}> 删除 </a>
            </span>
        }
    ]

    del = (id)=>{
        reqDelroot(id).then((res) => {
            if (res.errorCode === "0") {
                message.success("删除成功")
                this.reqTableList(this.state.paginationOption.current)
            }
        })
    }

    edit = (id)=>{
        this.setState({
            visibleModal:true,
            curModalOpenText:"编辑词汇",
            currentHandleId:id,
        })
        reqGetRootModal(id).then((res)=>{
            const [left] = splitObject(res.wordModal,["note","example","word","root"])
            this.props.form.setFieldsValue(this.handleFieldsPrefix(left, false))
        })
    }

    reqTableList = () => {
         this.setState({ tableLoading:true });
         return reqRootList(this.state.headerSearchCatch).then((res)=>{
             console.log(res);
             if (res.errorCode === "0") {
                this.setState({
                    tableData: res.rootWordList || [],
                    tableLoading: false
                })
            }
         })
    }

    forms = [{
        label: '词根',
        field: 'root',
        rules:[],
    },{
        label: '汉意',
        field: 'root',
        rules:[],
    },{
        label: '备注',
        field: 'note',
        rules:[],
    }]

    handleSwitchChange = (value) => {
        this.setState({
            isShowAddRelationWord:value
        })
    }

    onHeaderSearchSubmit = (event,values)=>{
        event.preventDefault();
        const {validateFields} = this.props.form;
        validateFields((err,values)=>{
            const {root} = values;
            this.setState({
                headerSearchCatch: Object.assign(this.state.headerSearchCatch, {root})
            },this.reqTableList)
        })
    }

    clearModal = ()=>{
        this.props.form.resetFields(this.modalFields)
        this.setState({
            visibleModal:false,
            curModalOpenText:"",
        })
    }

    handleFieldsPrefix = (values,type)=>{
        if (type) {
            const [left] = splitObject(values,this.modalFields)
            Object.keys(left).forEach(field=>{
                left[field.replace("modal_","")]=left[field]; delete left.field;
            })
            return left;
        } else {
            Object.keys(values).forEach(field=>{
                values["modal_"+field] = values[field]; delete values.field;
            });
            return values;
        }
    }

    handleModalOk = ()=>{
        this.props.form.validateFields(this.modalFields,(err,values)=>{
            if (err) return;
            const {currentHandleId,curModalOpenText} = this.state;
            let params = this.handleFieldsPrefix(values,true);
            if (curModalOpenText === "编辑词汇") {
                !currentHandleId && message.error("编辑失败，请重试"); return;
                params.id = currentHandleId;
            }
            return reqSaveRoot(params).then((res) => {
                if (res.errorCode === "0") {
                    message.success("保存成功");
                    this.clearModal();
                }
            })
        });
    }

    createWord = () => {
        this.props.dispatch({type:'asdasd',word:'inter'})
        this.setState({
            curModalOpenText:"添加词根",
            visibleModal:true,
        })
    }

    forms = [{
        label: '单词',
        field: 'word',
        rules:[],
    },{
        label: '词根',
        field: 'root',
        rules:[],
    }]

    modalForms = [{
        label: '词根',
        field: 'modal_root',
        rules:[],
    },{
        label: '翻译',
        field: 'modal_translated',
        rules:[{required:true,message:"请填写"}],
    },{
        label: '备注',
        field: 'modal_note',
        rules:[]
    },{
        label: '添加单词',
        filed: 'modal_relationWord',
        rule:[],
        noReactEle:true,
        render:() => <Switch defaultChecked={false} />
    }]

    render() {
        const {tableLoading,tableData,paginationOption,visibleModal,curModalOpenText} = this.state;
        const {getFieldDecorator, getFieldValue : DD} = this.props.form;

        return <React.Fragment>
                <header className={style.header}>
                    <Button onClick={this.createWord} type="primary"> 添加 </Button>
                    <Form onSubmit={this.onHeaderSearchSubmit} className='tabContentForm' layout="inline">
                        {
                            this.forms.map((i,k)=>
                                <FormItem label={i.label} key={i.field}>
                                    {
                                        getFieldDecorator(i.field,{
                                            rules: i.rules,
                                        })(
                                            <Input size="default" placeholder={`请输入${i.label}`} maxLength="100" />
                                        )
                                    }
                                </FormItem>
                            )
                        }
                        <FormItem key="submit">
                            <Button htmlType="submit"> 搜索 </Button>
                        </FormItem>
                    </Form>
                </header>
                <section>
                    <Table
                        columns={this.columns}
                        loading={tableLoading}
                        rowKey={(i,key)=>i.key = key}
                        dataSource={tableData}
                        pagination={{
                            ...paginationOption,
                            onChange:this.paginationChange
                        }}
                    />
                </section>
                <Modal
                     title={curModalOpenText}
                     visible={visibleModal}
                     onCancel={this.clearModal}
                     onOk={this.handleModalOk}
                     okText="保存"
                     cancelText="取消"
                >
                    <Form layout="inline">
                        {
                            this.modalForms.map((formItem,key)=> <FormItem label={formItem.label} key={formItem.field}>
                                    {
                                        formItem.noReactEle ? formItem.render() : getFieldDecorator(formItem.field,{
                                            rules: formItem.rules,
                                        })(
                                            formItem.render ? formItem.render() : <Input size="default" placeholder={`请输入${formItem.label}`} maxLength="100" />
                                        )
                                    }
                                </FormItem>
                            )
                        }
                        <FormItem>
                            {  DD("modal_relationWord") && getFieldDecorator('relationWord')( <Textarea placeholder="请使用;将每个单词隔开，翻译使用-隔开，例: example-例子; happy-开心" />) }
                        </FormItem>
                    </Form>
                </Modal>
        </React.Fragment>
    }
}
