import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Table, Menu,message,Modal,Select,Spin,Switch,Row,Col} from "antd"
import {reqRootList,reaSaveRoot,reqDelRoot,reqGetRootModal, reqDelroot, reqReviewWordsList} from 'services/api'
import style from './style.module.scss';
import {addRowsKey,omit,splitObject} from 'utils/util'
import {connect} from 'react-redux'

const FormItem = Form.Item;
const Textarea = Input.TextArea;

@connect(state=>({...state}))
@Form.create()
export default class ReviewWord extends Component {

    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            tableLoading: true,
            tableData: [],
            headerSearchCatch: { root: '', pageSize:10, pageNum:1 },
            paginationOption:{
                current:1,
                total:0,
            }
        }
    }

    componentDidMount () { this.reqTableList() }

    columns = [
        {
            title: '单词',
            dataIndex: 'word',
            key: 'word',
            fixed:'left'
        },{
            title: '翻译',
            dataIndex: 'translated',
            key: 'translated'
        },{
            title: 'handle',
            dataIndex: 'handle',
            key: 'handle',
            render:(i,record)=> <Button.Group>
                <Button onClick={this.forgotWord}> 忘记了 </Button>
                <Button onClick={this.remember}> 记住了 </Button>
            </Button.Group>
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
        return reqReviewWordsList().then((res) => {
            console.log(res);
            if (res.errorCode === "0") {
                this.setState({
                    tableData: res.reviewWordsList || []
                })
            }
        }).finally((res)=>{
            this.setState({
                tableLoading: false
            })
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

    remember = () => {
        this.props.dispatch({type:'asdasd',word:'inter'})
        this.setState({
            curModalOpenText:"添加词根",
            visibleModal:true,
        })
    }

    forgotWord = () => {}

    forms = [{
        label: '单词',
        field: 'word',
        rules:[],
    },{
        label: '翻译',
        field: 'translated',
        rules:[],
    }]

    render() {
        const {tableLoading,tableData,paginationOption} = this.state;
        const {getFieldDecorator, getFieldValue : DD} = this.props.form;

        return <React.Fragment>
            <header className={style.header}>
                <Form onSubmit={this.onHeaderSearchSubmit} className='tabContentForm' layout="inline">
                    <Row justify="space-between" type="flex">
                        <Col>
                         {
                            this.forms.map((i,k)=>
                                <FormItem label={i.label} key={i.field}>
                                    {
                                        getFieldDecorator(i.field, {
                                            rules: i.rules
                                        })(
                                            i.render ? i.render() : <Input size="default" placeholder={`请输入${i.label}`} maxLength="100" />
                                        )
                                    }
                                </FormItem>
                            )
                         }
                        </Col>
                        <Col>
                            <FormItem key="submit" >
                                <Button.Group>
                                    <Button htmlType="submit"> 搜索 </Button>
                                    <Button onClick={this.reqTableList}> 刷新 </Button>
                                </Button.Group>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </header>

            <section style={{marginTop:20}}>
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
        </React.Fragment>
    }
}
