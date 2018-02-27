package com.poster.controller;

import com.poster.entity.AccountManage;
import com.poster.entity.UseHistory;
import com.poster.response.model.AccountManageResponse;
import com.poster.response.model.RelevanceAccountResponse;
import com.poster.response.model.UseHistoryResponse;
import com.poster.utils.ErrorCode;
import com.poster.response.model.AccountResponse;
import com.poster.service.AccountManageService;
import com.poster.utils.MyException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import sun.util.resources.ga.LocaleNames_ga;

/**
 * Created by zhaobin on 2018/1/16.
 */
@RestController
@RequestMapping("account/manage")
@Api(value = "账户管理", description = "账户管理相关接口")
public class AccountManageController {

    private Logger logger = LoggerFactory.getLogger(AccountManageController.class);

    @Autowired
    private AccountManageService accountManageService;

    @ApiOperation(value = "保存账户管理")
    @RequestMapping(value = "save", method = RequestMethod.POST)
    public AccountResponse save(@ApiParam(required = true, value = "手机号", name = "phone") @RequestParam String phone,
                                  @ApiParam(required = true, value = "姓名", name = "name") @RequestParam String name ) {
        AccountResponse rd = new AccountResponse();
        ErrorCode result = ErrorCode.OK;
        try {
            accountManageService.save(phone,name);
        } catch (MyException e) {
            result = e.getErrorCode();
            logger.error("保存账户管理出错" + e, e);
        } catch (Exception e) {
            result = ErrorCode.ERROR;
            logger.error("服务器错误" + e, e);
        }
        rd.setErrorCode(result.value);
        rd.setValue(result.memo);
        return rd;
    }

    @ApiOperation(value = "账户列表")
    @RequestMapping(value = "list", method = RequestMethod.POST)
    public AccountManageResponse list(@ApiParam(value = "姓名", name = "name") @RequestParam(required = false) String name,
                                      @ApiParam(value = "手机号", name = "phone") @RequestParam(required = false) String phone,
                                      @ApiParam(required = true, value = "地区id", name = "endemicId") @RequestParam(required = false) Integer endemicId,
                                      @ApiParam(required = true, value = "页码", name = "pageNum") @RequestParam Integer pageNum,
                                      @ApiParam(required = true, value = "每页数量", name = "pageSize") @RequestParam Integer pageSize ) {
        AccountManageResponse rd = new AccountManageResponse();
        ErrorCode result = ErrorCode.OK;
        try {
            Page<AccountManage>  page = accountManageService.list(name, phone, pageNum, pageSize, endemicId);
            rd.setAccountManageList(page.getContent());
            rd.setTotalResult(page.getTotalElements());
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

    @ApiOperation(value = "获取帐户详情")
    @RequestMapping(value = "get/{id}", method = RequestMethod.GET)
    public AccountManageResponse get(@ApiParam(required = true, value = "主键", name = "id") @PathVariable Long id) {
        AccountManageResponse rd = new AccountManageResponse();
        ErrorCode result = ErrorCode.OK;
        try {
            rd.setAccountManage(accountManageService.get(id));;
        }catch(MyException e){
            result = e.getErrorCode();
            logger.error("删除仓库出错" + e, e);
        } catch (Exception e){
            result = ErrorCode.ERROR;
            logger.error("服务器错误" + e, e);
        }
        rd.setErrorCode(result.value);
        rd.setValue(result.memo);
        return rd;
    }

    @ApiOperation(value = "帐户管理中，对Item添加账户")
    @RequestMapping(value = "add_account", method = RequestMethod.POST)
    public AccountManageResponse add_account(@ApiParam(required = true, value = "主键", name = "id") @RequestParam Long id,
                                             @ApiParam(required = true, value = "要添加的账户id", name = "accountIds") @RequestParam String accountIds) {
        AccountManageResponse rd = new AccountManageResponse();
        ErrorCode result = ErrorCode.OK;
        try {
            accountManageService.saveAccountIds(id,accountIds);
        } catch (MyException e) {
            result = e.getErrorCode();
            logger.error("添加帐户失败" + e, e);
        } catch (Exception e) {
            result = ErrorCode.ERROR;
            logger.error("服务器错误" + e, e);
        }
        rd.setErrorCode(result.value);
        rd.setValue(result.memo);
        return rd;
    }

    @ApiOperation(value = "获取关联的充值与赠送金额")
    @RequestMapping(value = "getBalance/{userId}/{accountId}", method = RequestMethod.GET)
    public RelevanceAccountResponse getBalance(
            @ApiParam(required = true, value = "用户id", name = "userId") @PathVariable Long userId,
            @ApiParam(required = true, value = "帐户id", name = "accountId") @PathVariable Integer accountId) {
        RelevanceAccountResponse rd = new RelevanceAccountResponse();
        ErrorCode result = ErrorCode.OK;
        try {
            rd.setBalanceModal(accountManageService.getRelevanceAccount(userId, accountId));
        }catch(MyException e){
            result = e.getErrorCode();
            logger.error("删除仓库出错" + e, e);
        } catch (Exception e){
            result = ErrorCode.ERROR;
            logger.error("服务器错误" + e, e);
        }
        rd.setErrorCode(result.value);
        rd.setValue(result.memo);
        return rd;
    }

    @ApiOperation(value = "查询帐户使用记录")
    @RequestMapping(value = "getUseHistoryHist", method = RequestMethod.POST)
    public UseHistoryResponse getUseHistoryHist( @ApiParam(required = true, value = "用户id", name = "userId") @RequestParam Long userId,
                                          @ApiParam(required = true, value = "帐户id", name = "accountId") @RequestParam Integer accountId,
                                          @ApiParam(required = true, value = "页码", name = "pageNum") @RequestParam Integer pageNum,
                                          @ApiParam(required = true, value = "每页数量", name = "pageSize") @RequestParam Integer pageSize) {
        UseHistoryResponse rd = new UseHistoryResponse();
        ErrorCode result = ErrorCode.OK;
        try {
            Page<UseHistory> page = accountManageService.getUseHistoryList(userId, accountId,pageNum,pageSize);
            rd.setUseHistoryList(page.getContent());
            rd.setTotalResult(page.getTotalElements());
        }catch(MyException e){
            result = e.getErrorCode();
            logger.error("删除仓库出错" + e, e);
        } catch (Exception e){
            result = ErrorCode.ERROR;
            logger.error("服务器错误" + e, e);
        }
        rd.setErrorCode(result.value);
        rd.setValue(result.memo);
        return rd;
    }
}
