import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Table, Menu,message,Modal,Select } from "antd"
import {reqWordList,reqSaveWord,reqDelword,reqGetWordModal} from 'services/api'
import style from './style.scss';
import moment from "moment";
import {addRowsKey,omit,splitObject} from 'utils/util'
const FormItem = Form.Item;
const Textarea = Input.TextArea;

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
       this.reqTableList(1);
    }

    columns = [
        {
            title: 'word',
            dataIndex: 'word',
            key: 'word',
            fixed:'left',
            width:100,
        },{
            title: 'create Time',
            dataIndex: 'createTime',
            key: 'createTime',
            render: i => moment(i).format("YYYY-MM-DD")
        },{
            title: 'root',
            dataIndex: 'root',
            key: 'root',
        },{
            title: 'example',
            dataIndex: 'example',
            key: 'example',
        },{
            title: 'note',
            dataIndex: 'note',
            key: 'note',
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
        reqGetWordModal(id).then((res)=>{
            console.log(res);
            const [left] = splitObject(res.wordModal,["note","example","word","root"])
            console.log(left);
            this.props.form.setFieldsValue(this.handleFieldsPrefix(left,false))
        })
    }

    reqTableList = (pageNum=1,word="",root="") => {
     this.setState({  tableLoading:true  });
     if (this.state.isCarryHeaderForm) {
        word = this.props.form.getFieldsValue().word;
        root = this.props.form.getFieldsValue().root;
     }
     return reqWordList({
         pageNum,
         pageSize:10,
         word,root
     }).then((res)=>{
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
        this.setState({
            curModalOpenText:"添加词汇",
            visibleModal:true,
        })
    }

    render() {
        const {tableLoading,tableData,paginationOption,visibleModal,curModalOpenText} = this.state;
        const {getFieldDecorator} = this.props.form;
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
                            <div style={{marginTop:10}}>
                                <FormItem label="备注" key="modal_note">
                                    {
                                        getFieldDecorator("modal_note",{rules:[],
                                        })(
                                            <Textarea style={{width:171}} autosize />
                                        )
                                    }
                                </FormItem>

                                <FormItem label="示例" key="example_note">
                                    {
                                        getFieldDecorator("modal_example",{rules:[],
                                        })(
                                            <Textarea style={{width:171}} autosize/>
                                        )
                                    }
                                </FormItem>
                            </div>
                        </Form>
                </Modal>
        </React.Fragment>
    }
}