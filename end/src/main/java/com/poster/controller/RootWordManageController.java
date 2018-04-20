package com.poster.controller;

import com.poster.entity.NewWordManage;
import com.poster.entity.RootWordManage;
import com.poster.response.model.NewWordManageResponse;
import com.poster.response.model.RootWordManageResponse;
import com.poster.service.RootWordManageService;
import com.poster.utils.ErrorCode;
import com.poster.utils.MyException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("root")
@Api(value = "词根管理", description = "词根管理")
public class RootWordManageController {
    private Logger logger = LoggerFactory.getLogger(NewWordManage.class);
    @Autowired
    RootWordManageService rootWordManageService;

    @ApiOperation(value = "词根列表")
    @RequestMapping(value = "list", method = RequestMethod.POST)
    public RootWordManageResponse list(@ApiParam(required = true, value = "页码", name = "pageNum") @RequestParam Integer pageNum,
                                       @ApiParam(required = true, value = "页数", name = "pageSize") @RequestParam Integer pageSize) throws MyException {
        RootWordManageResponse rd = new RootWordManageResponse();
        ErrorCode result = ErrorCode.OK;
        try {
            Page<RootWordManage> page = rootWordManageService.list(pageNum,pageSize);
            rd.setRootWordList(page.getContent());
            rd.setTotalResult(page.getTotalElements());
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

    @ApiOperation(value = "创建词根")
    @RequestMapping(value = "save", method = RequestMethod.POST)
    public RootWordManageResponse save(@ApiParam(required = true, value = "主键", name = "id") @RequestParam(required = false) Long id,
                                      @ApiParam(required = true, value = "属于的词根", name = "root") @RequestParam(required = false) String root,
                                      @ApiParam(required = true, value = "单词备注", name = "note") @RequestParam(required = false) String note) throws MyException {
        RootWordManageResponse rd = new RootWordManageResponse();
        ErrorCode result = ErrorCode.OK;
        try {
            rootWordManageService.save(id,root,note);
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
}
