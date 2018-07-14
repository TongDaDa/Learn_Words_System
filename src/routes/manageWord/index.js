import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Table, Menu, message,Modal,Icon, DatePicker } from "antd"
import {reqWordList,reqSaveWord,reqDelword,reqGetWordModal} from 'services/api'
import style from './style.module.scss';
import moment from "moment";
import {addRowsKey,omit,splitObject,mapStateMiddleWare} from 'utils/util'
import {connect} from 'react-redux';
import request from 'utils/request';
const FormItem = Form.Item;
const Textarea = Input.TextArea;

@connect(mapStateMiddleWare('manageWord',['currentState']))
@Form.create()
export default class ManageWord extends Component {

    static propTypes = {};

    constructor(props) {
        super(props);
        this.headerForm = ['header-word', 'header-root']
        this.modalFields = ["modal_word","modal_root","modal_note","modal_translated"]
        this.state = {
            tableLoading: true,
            tableData: [],
            isCarryHeaderForm: false, //当前是否处于搜索条件中
            visibleModal:false,
            currentHeaderSearch:{pageNum:1,pageSize:10, word:"",root:"", date:''},
            wordNumToday:0,
            curModalOpenText:"",
            currentHandleId:null,
            paginationOption:{
                current:1,
                total:0,
            },
            exampleSentenceList:[],
        }
    }

    componentDidMount(){ this.reqTableList(); }

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
            title: 'translated',
            dataIndex: 'translated',
            key: 'translated',
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
                const {pagationOptions} = this.state;
                const calaTotal = pagationOptions.total - 1
                this.setState({
                    pagationOptions: Object.assign(pagationOptions,{ current: Math.ceil(calaTotal/pagationOptions.pageSize) })
                })
                this.reqTableList();
            }
        })
    }

    edit = (id)=>{
        this.setState({
            visibleModal:true,
            curModalOpenText:"编辑词汇",
            currentHandleId:id,
        })

        reqGetWordModal(id).then(res => {
            let [left] = splitObject(res.wordModal,["note","word","example","root","translated"])
            left.root = left.root === '无' ? '' : left.root;
            if (left.example) {
                let exampleSentenceList = JSON.parse(left.example)
                this.setState({ exampleSentenceList })
            }
            left = omit(left, ['example'])
            this.props.form.setFieldsValue(this.handleFieldsPrefix(left, false))
        })

    }

    reqTableList = () => {
         this.setState({tableLoading: true});
         const params = this.state.currentHeaderSearch;
         return reqWordList({...params,date: params.date && params.date.format("YYYY-MM-DD")}).then((res) => {
             if (res.errorCode === "0") {
                this.setState({
                    wordNumToday: res.wordNumToday,
                    tableData: addRowsKey(res.wordList || []),
                    tableLoading:false,
                    paginationOption:{...this.state.paginationOption,total:res.totalResult}
                })
            }
         })
    }

    forms = [{
        label: '单词',
        field: 'header-word',
        rules:[],
    },{
        label: '词根',
        field: 'header-root',
        rules:[],
    },{
        label: '时间',
        field: 'header-date',
        rules:[],
        render: () => <DatePicker style={{ width: 200 }} format="YYYY-MM-DD" onChange={this.handleDateChange} />
    }]

    modalForms = [{
        label: '单词',
        field: 'modal_word',
        rules:[
            {required:true,message:"请填写单词"},
            {pattern:/^[a-zA-z]+$/g,message:"单词必须为字母形势"}
        ],
    },{
        label: '词根',
        field: 'modal_root',
        rules:[
            {pattern:/^[a-zA-z]*$/g,message:"词根必须为字母形势"}
        ],
     },{
        label: '翻译',
        field: 'modal_translated',
        rules:[
            {required:true, message:"请填写"}
        ],
    }]

    onHeaderSearchSubmit = (event)=>{
        event.preventDefault()
        const {validateFields} = this.props.form;
        const ar = this.forms.map((i,k)=> i.field )
        validateFields(ar,(err,values) => {
            if (err) { return; }
            for (let key in values) {
                values[key.split('-')[1]] = values[key]
                try{
                    delete values[key]
                } catch (err){ }
            }
            let {word,root,date} = values;
            this.setState({
                currentHeaderSearch: Object.assign(this.state.currentHeaderSearch, {pageNum:1, word,root,date}),
                paginationOption: Object.assign(this.state.paginationOption,{current:1}) }, this.reqTableList)
        })
    }

    clearModal = ()=>{
        this.props.form.resetFields(this.modalFields)
        this.setState({
            exampleSentenceList:[{sentence:null,translated:null}],
            visibleModal:false,
            curModalOpenText:"",
        })
    }

    /**
     * @note
     * transform fields of form key of prefix
     * @param values
     * @param type
     * @return {*}
     */
    handleFieldsPrefix = (values,type)=>{
        if (type) {
            const [left] = splitObject(values,this.modalFields)
            Object.keys(left).forEach(field=>{
                left[field.replace("modal_","")]= left[field];
                try { delete left[field]; } catch (err) { }
            })
            return left;            
        } else {
            Object.keys(values).forEach(field=>{
                values["modal_"+field] = values[field];
                try { delete values[field]; } catch (err) { }
            });
            return values;
        }
    }

    //sdf
    handleModalOk = () => {
        this.props.form.validateFields(this.modalFields,(err,values)=>{
            if (err) return;
            const {currentHandleId,exampleSentenceList,curModalOpenText,pagationOptions} = this.state;
            const IS_EDIT = curModalOpenText === "编辑词汇"
            let params = this.handleFieldsPrefix(values, true);
            const deepFormatJudge = (sentence) => {
                return !/^[a-zA-Z]+$/g.test(sentence.translated)
            }
            if (!exampleSentenceList.every((i)=> i.sentence && i.translated)) {
                message.warn('请把sentence填写完整')
                return;
            } else if (!exampleSentenceList.every(deepFormatJudge)) {
                message.warn('例子翻译都搞成英文的啦？看来你不需要我啦!')
                return;
            }
            params.root = params.root || '无'
            params.note = params.note || ''
            params.example = JSON.stringify(exampleSentenceList)
            if (IS_EDIT) {
                if (!currentHandleId) { message.error("编辑失败，请重试"); return; }
                params.id = this.state.currentHandleId;
            }
            reqSaveWord(params).then((res) => {
                if (res.errorCode === "0") {
                    message.success("保存成功");
                    const calaTotal = pagationOptions.total + 1
                    this.setState({
                        pagationOptions: Object.assign(pagationOptions,{ current: Math.ceil(calaTotal/pagationOptions.pageSize) })
                    })
                    this.reqTableList(...this.searchHeaderForm().filter(Number))
                    this.clearModal();
                }
            })
        });
    }

    createWord = ()=>{
        console.log(this.props, this.props.currentState);
        this.setState({
            curModalOpenText:"添加词汇",
            visibleModal:true,
        })
    }

    getPrefixOfObject = (prefix, obj) => {
        let nObj = {}
        Object.keys(obj).forEach((key,i) => {
            let exceptedKey = key.match(prefix);
            if (exceptedKey === null) return;
            exceptedKey = key.slice(~exceptedKey[0].length && exceptedKey[0].length);
            nObj[exceptedKey] = obj[key]
        })
        return nObj;
    }

    paginationChange = (n) => {
        this.setState({
            paginationOption:Object.assign(this.state.paginationOption,{current:n})
        },this.reqTableList);
    }

    /**
     * @note
     * @param margeSource margeOptions , the index shall prevail
     * @return {Array}
     */
    searchHeaderForm = (margeSource=[]) => {
        let arr = [this.state.paginationOption.current];
        if (this.state.isCarryHeaderForm) {
            debugger;
            const fields = this.props.form.getFieldsValue();
            arr.push(...this.headerForm.map((key)=> fields[key] ))
        } else {
            arr.concat(["",""])
        }
        for (let i = 0; i < margeSource.length; i++) { arr[i] = margeSource[i] }
        return arr
    }

    handleAddExample =  (handleType,index)=>{
        const exampleSentenceList = this.state.exampleSentenceList;
        if (handleType === 'add') {
            exampleSentenceList.push({sentence:null,translated:null});
        } else {
            exampleSentenceList.splice(index,1)
        }
        this.setState({exampleSentenceList:  addRowsKey(exampleSentenceList)})
    }

    handleExampleInputChange = (t,k,e)=>{
        const exampleSentenceList = this.state.exampleSentenceList;
        const value = e.target.value;
        if (t === "sentence") {
            exampleSentenceList[k].sentence = value;
        } else {
            exampleSentenceList[k].translated = value;
        }
        this.setState({exampleSentenceList})
    }

    render() {
        const {tableLoading,tableData,paginationOption,wordNumToday,visibleModal,curModalOpenText,exampleSentenceList} = this.state;
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
                                            initialValue: ""
                                        })(
                                            i.render ? i.render() : <Input size="default" placeholder={`请输入${i.label}`} maxLength="100" />
                                        )
                                    }
                                </FormItem>
                            )
                        }
                        <FormItem label="今日已添加单词"> {wordNumToday} </FormItem>
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
                            <FormItem label="备注" key="example_note">
                                {
                                    getFieldDecorator("modal_note",{rules:[],
                                    })(
                                        <Textarea style={{width:171}} autosize/>
                                    )
                                }
                            </FormItem>

                            <FormItem label="例句" key="example_sentence" />
                            {
                                !exampleSentenceList.length && <Icon
                                    style={{lineHeight:39 + 'px'}}
                                    onClick={() => {this.handleAddExample('add')}}
                                    type="plus-circle"
                                    key="plus"
                                />
                            }
                            {
                                exampleSentenceList.map((i,k)=> <div key={k} className={style.exampleSentenceItem}>
                                      <span className={style.formPrefix}>
                                          <Icon onClick={() => {this.handleAddExample('remove', k)}} type="minus-circle" key="minus" />
                                           <Icon
                                               onClick={() => {this.handleAddExample('add')}}
                                               type="plus-circle"
                                               key="plus"
                                           />
                                        </span>
                                        <div className={style.examLine}>
                                            <Textarea style={{width: 171,marginRight:10}} onChange={(e)=>{this.handleExampleInputChange("sentence",k,e)}} value={i.sentence} autosize />
                                            <Textarea style={{width: 171}} onChange={(e)=>{this.handleExampleInputChange("translated",k,e)}} value={i.translated}  autosize />
                                        </div>
                                    </div>
                                )
                            }
                        </Form>
                </Modal>
        </React.Fragment>
    }
}