
package com.poster.controller;

import com.poster.dao.repository.AccountRepository;
import com.poster.utils.ErrorCode;

import com.poster.entity.Account;
import com.poster.response.model.AccountResponse;
import com.poster.service.AccountService;

import com.poster.utils.MyException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("account")
@Api(value = "账户管理", description = "账户管理相关接口")
public class AccountController {

    private Logger logger = LoggerFactory.getLogger(Account.class);

    @Autowired
    private AccountService accountService;

    @ApiOperation(value = "保存账户")
    @RequestMapping(value = "save", method = RequestMethod.POST)
    public AccountResponse save(@ApiParam(required = true, value = "账户名称", name = "accountName") @RequestParam String accountName,
                                @ApiParam(required = true, value = "开票", name = "isBill") @RequestParam Boolean isBill,
                                @ApiParam(value = "赠送规则", name = "giveRule") @RequestParam(required = false) Integer giveRule,
                                @ApiParam(value = "充值赠送金额", name = "moneyJSON") @RequestParam(required = false) String moneyJSON,
                                @ApiParam(value = "主键", name = "id") @RequestParam(required = false) Long id ) throws MyException {
        AccountResponse rd = new AccountResponse();
        ErrorCode result = ErrorCode.OK;
        try {
            accountService.save(accountName,isBill,giveRule,moneyJSON,id);
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

    @ApiOperation(value = "账户列表")
    @RequestMapping(value = "list", method = RequestMethod.GET)
    public AccountResponse list(@ApiParam(required = true, value = "页码", name = "pageNum") @RequestParam Integer pageNum,
                                @ApiParam(required = true, value = "页数", name = "pageSize") @RequestParam Integer pageSize) {
        AccountResponse rd = new AccountResponse();
        ErrorCode result = ErrorCode.OK;
        try {
            accountService.list(pageNum,pageSize,rd);
        } catch (MyException e) {
            result = e.getErrorCode();
            logger.error("查询仓库列表出错" + e, e);
        } catch (Exception e) {
            result = ErrorCode.ERROR;
            logger.error("服务器错误" + e, e);
        }
        rd.setErrorCode(result.value);
        rd.setValue(result.memo);
        return rd;
    }

    @ApiOperation(value = "删除仓库")
    @RequestMapping(value = "del/{id}", method = RequestMethod.DELETE)
    public AccountResponse del(@ApiParam(required = true, value = "仓库ID", name = "id") @PathVariable Long id) {
        AccountResponse rd = new AccountResponse();
        ErrorCode result = ErrorCode.OK;
        try {
            accountService.del(id);
        } catch (MyException e) {
            result = e.getErrorCode();
            logger.error("删除仓库出错" + e, e);
        } catch (Exception e) {
            result = ErrorCode.ERROR;
            logger.error("服务器错误" + e, e);
        }
        rd.setErrorCode(result.value);
        rd.setValue(result.memo);
        return rd;
    }

    @ApiOperation(value = "获取账户详情")
    @RequestMapping(value = "get/{id}", method = RequestMethod.GET)
    public AccountResponse get(@ApiParam(required = true, value = "账户id", name = "id") @PathVariable Long id) {
        AccountResponse rd = new AccountResponse();
        ErrorCode result = ErrorCode.OK;
        try {
            rd.setAccount(accountService.get(id));
        } catch (MyException e) {
            result = e.getErrorCode();
            logger.error("获取账户详情出错" + e, e);
        } catch (Exception e) {
            result = ErrorCode.ERROR;
            logger.error("服务器错误" + e, e);
        }
        rd.setErrorCode(result.value);
        rd.setValue(result.memo);
        return rd;
    }

    /*
    * 待修改
    * */
    @ApiOperation(value = "根据ids获取对应的帐户列表")
    @RequestMapping(value = "get_accounts/{ids}", method = RequestMethod.GET)
    public AccountResponse getAccounts(@ApiParam(required = true, value = "账户id", name = "ids") @PathVariable String ids) {
        AccountResponse rd = new AccountResponse();
        ErrorCode result = ErrorCode.OK;
        try {
//            rd.setAccount(accountService.getAccounts(ids));
        } catch (MyException e) {
            result = e.getErrorCode();
            logger.error("获取账户详情出错" + e, e);
        } catch (Exception e) {
            result = ErrorCode.ERROR;
            logger.error("服务器错误" + e, e);
        }
        rd.setErrorCode(result.value);
        rd.setValue(result.memo);
        return rd;
    }

    @ApiOperation(value = "编辑账户信息")
    @RequestMapping(value = "update/{id}", method = RequestMethod.GET)
    public AccountResponse update(@ApiParam(required = true, value = "账户id",name="id") Integer id) {
        AccountResponse rd = new AccountResponse();
//        accountService.update(posterRes);
//        String result = JSONObject.toJSONString(posterResponse);
        return rd;
    }
}
