package com.poster.controller;
import com.poster.entity.NewWordManage;
import com.poster.response.model.NewWordManageResponse;
import com.poster.service.NewWordManageService;
import com.poster.utils.ErrorCode;
import com.poster.utils.MyException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

@RestController
@RequestMapping("word")
@Api(value = "单词管理", description = "单词管理")
public class NewWordManageController {
    private Logger logger = LoggerFactory.getLogger(NewWordManage.class);
    @Autowired
    NewWordManageService newWordManageService;

    @ApiOperation(value = "创建业务分类")
    @RequestMapping(value = "save", method = RequestMethod.POST)
    public NewWordManageResponse save(@ApiParam(required = true, value = "主键", name = "id") @RequestParam(required = false) Long id,
                                     @ApiParam(required = true, value = "单词", name = "word") @RequestParam String word,
                                      @ApiParam(required = true, value = "译文", name = "translated") @RequestParam String translated,
                                     @ApiParam(required = true, value = "属于的词根", name = "root") @RequestParam(required = false) String root,
                                     @ApiParam(required = true, value = "单词用例", name = "example") @RequestParam(required = false) String example,
                                     @ApiParam(required = true, value = "单词备注", name = "note") @RequestParam(required = false) String note ) throws MyException {
        NewWordManageResponse rd = new NewWordManageResponse();
        ErrorCode result = ErrorCode.OK;
        try {
            newWordManageService.save(id,word,root,example,translated,note);
        } catch (MyException e) {
            result = e.getErrorCode();
            logger.error("保存账户出错" + e, e);
        } catch (Exception e) {
            result = ErrorCode.ERROR;
            logger.error("服务器错误" + e, e);
        }
        rd.setErrorCode(result.value);
        rd.setValue(result.memo);
        return rd;
    }

    @ApiOperation(value = "获取单词列表")
    @RequestMapping(value = "list", method = RequestMethod.POST)
    public NewWordManageResponse list(@ApiParam(required = true, value = "单词", name = "word") @RequestParam(required = false) String word,
                                      @ApiParam(required = true, value = "属于的词根", name = "root") @RequestParam(required = false) String root,
                                      @ApiParam(required = true, value = "页码", name = "pageNum") @RequestParam Integer pageNum,
                                      @ApiParam(required = true, value = "页数", name = "pageSize") @RequestParam Integer pageSize ) throws MyException {
        NewWordManageResponse rd = new NewWordManageResponse();
        ErrorCode result = ErrorCode.OK;
        try {
            Page<NewWordManage> page = newWordManageService.list(word,root,pageNum,pageSize);
            rd.setTotalResult(page.getTotalElements());
            rd.setWordList(page.getContent());
        } catch (MyException e) {
            result = e.getErrorCode();
            logger.error("保存账户出错" + e, e);
        } catch (Exception e) {
            result = ErrorCode.ERROR;
            logger.error("服务器错误" + e, e);
        }
        rd.setErrorCode(result.value);
        rd.setValue(result.memo);
        return rd;
    }


    @ApiOperation(value = "获取单词Modal")
    @RequestMapping(value = "get/{id}", method = RequestMethod.GET)
    public NewWordManageResponse list(@ApiParam(required = true, value = "主键", name = "id") @PathVariable(required = false) Long id) throws MyException {
        NewWordManageResponse rd = new NewWordManageResponse();
        ErrorCode result = ErrorCode.OK;
        try {
            NewWordManage modal = newWordManageService.get(id);
            rd.setWordModal(modal);
        } catch (MyException e) {
            result = e.getErrorCode();
            logger.error("读取单词出错" + e, e);
        } catch (Exception e) {
            result = ErrorCode.ERROR;
            logger.error("服务器错误" + e, e);
        }
        rd.setErrorCode(result.value);
        rd.setValue(result.memo);
        return rd;
    }

    @ApiOperation(value = "获取单词Modal")
    @RequestMapping(value = "del/{id}", method = RequestMethod.DELETE)
    public NewWordManageResponse del(@ApiParam(required = true, value = "主键", name = "id") @PathVariable(required = false) Long id) throws MyException {
        NewWordManageResponse rd = new NewWordManageResponse();
        ErrorCode result = ErrorCode.OK;
        try {
            newWordManageService.del(id);
        } catch (MyException e) {
            result = e.getErrorCode();
            logger.error("删除单词出错" + e, e);
        } catch (Exception e) {
            result = ErrorCode.ERROR;
            logger.error("服务器错误" + e, e);
        }
        rd.setErrorCode(result.value);
        rd.setValue(result.memo);
        return rd;
    }
}
