import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Table, Menu,message,Modal,Select,Spin } from "antd"
import {reqRootList,reaSaveRoot,reqDelRoot,reqGetRootModal} from 'services/api'
import style from './style.scss';
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
            curModalOpenText:"",
            currentHandleId:null,
            paginationOption:{
                current:1,
                total:0,
            },
        }
    }

    componentDidMount(){
       // this.reqTableList(1);

    }

    columns = [
        {
            title: 'root',
            dataIndex: 'root',
            key: 'root',
            fixed:'left',
            width:100,
        },{
            title: 'translated',
            dataIndex: 'translated',
            key: 'translated'
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
        reqDelword(id).then((res)=>{
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
            this.props.form.setFieldsValue(this.handleFieldsPrefix(left,false))
        })
    }

    reqTableList = (pageNum=1) => {
         this.setState({ tableLoading:true });
         return reqRootList({
             pageNum,
             pageSize:10
         }).then((res)=>{
             console.log(res);
             if (res.errorCode === "0") {
                this.setState({
                    tableData: addRowsKey(res.wordList || []),
                    tableLoading:false
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

    modalForms = [{
        label: '单词',
        field: 'modal_word',
        rules:[],
    },{
        label: '词根',
        field: 'modal_root',
        rules:[],
     }]

    onHeaderSearchSubmit = (event,values)=>{
        event.preventDefault();
        const {validateFields} = this.props.form;
        validateFields((err,values)=>{
            if (err) { return; }
            const {word,root} = values;
            let isAll = false;
            if (!word && !root) { isAll = true }
            this.setState({isCarryHeaderForm:isAll})
            this.reqTableList(this.state.paginationOption.current,word,root)
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
            if (curModalOpenText== "编辑词汇") {
                if (!currentHandleId) { message.error("编辑失败，请重试"); return; }
                params.id = this.state.currentHandleId;
            }
            reqSaveWord(params).then((res)=>{
                if (res.errorCode === "0") {
                    message.success("保存成功");
                    this.reqTableList(1,"","")
                    this.clearModal();
                }
            })
        });
    }

    createWord = ()=>{
        this.props.dispatch({type:'asdasd',word:'inter'})
        // this.setState({
        //     curModalOpenText:"添加词汇",
        //     visibleModal:true,
        // })
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
    }]

    render() {
        const {tableLoading,tableData,paginationOption,visibleModal,curModalOpenText} = this.state;
        const {getFieldDecorator} = this.props.form;
        console.log(this.props);
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
                                this.modalForms.map((formItem,key)=>
                                    <FormItem label={formItem.label} key={formItem.field}>
                                        {
                                            getFieldDecorator(formItem.field,{
                                                rules: formItem.rules,
                                            })(
                                                <Input size="default" placeholder={`请输入${formItem.label}`} maxLength="100" />
                                            )
                                        }
                                    </FormItem>
                                )
                            }
                        </Form>
                </Modal>
        </React.Fragment>
    }
}