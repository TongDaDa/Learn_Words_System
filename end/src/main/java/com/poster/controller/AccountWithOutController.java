package com.poster.controller;

import com.poster.pure.entity.AccountWithOut;
import com.poster.response.model.AccountWithoutResponse;
import com.poster.service.AccountWithOutService;
import com.poster.utils.ErrorCode;
import com.poster.utils.MyException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("account/without")
@Api(value = "账户管理", description = "账户管理相关接口")
public class AccountWithOutController {

    private Logger logger = LoggerFactory.getLogger(AccountManageController.class);

    @Autowired
    private AccountWithOutService accountWithOutService;

    @ApiOperation(value = "查询帐户信息及余额")
    @RequestMapping(value = "getAccount", method = RequestMethod.POST)
    public AccountWithoutResponse getAccount(@ApiParam(value = "用户id", name = "userId") @RequestParam(required = false) Long userId,
                                         @ApiParam(value = "用户名称", name = "name") @RequestParam(required = false) String name,
                                         @ApiParam(value = "手机号", name = "phone") @RequestParam(required = false) String phone,
                                         @ApiParam(value = "帐户id", name = "accountId") @RequestParam(required = false) Integer accountId) {
        AccountWithoutResponse rd = new AccountWithoutResponse();
        ErrorCode result = ErrorCode.OK;
        try {
            List<AccountWithOut> AccountWithOutList = accountWithOutService.getAccount(userId,name,phone,accountId);
            rd.setAccountModal(AccountWithOutList);
        }catch(MyException e){
            result = e.getErrorCode();
            logger.error("充值余额出错" + e, e);
        } catch (Exception e){
            result = ErrorCode.ERROR;
            logger.error("服务器错误" + e, e);
        }
        rd.setErrorCode(result.value);
        rd.setValue(result.memo);
        return rd;
    }

    @ApiOperation(value = "充值")
    @RequestMapping(value = "topUpMoney", method = RequestMethod.POST)
    public AccountWithoutResponse topUpMoney(@ApiParam(required = true, value = "用户id", name = "userId") @RequestParam Long userId,
                                             @ApiParam(required = true, value = "帐户id", name = "accountId") @RequestParam Integer accountId,
                                             @ApiParam(required = true, value = "充值金额", name = "topUpMoney") @RequestParam Long topUpMoney) {
        AccountWithoutResponse rd = new AccountWithoutResponse();
        ErrorCode result = ErrorCode.OK;
        try {
            accountWithOutService.topUpMoney(userId,accountId,topUpMoney);
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


    @ApiOperation(value = "扣款")
    @RequestMapping(value = "deDuctMoney", method = RequestMethod.POST)
    public AccountWithoutResponse deDuctMoney(@ApiParam(required = true, value = "用户id", name = "userId") @RequestParam Long userId,
                                              @ApiParam(required = true, value = "帐户id", name = "accountId") @RequestParam Integer accountId,
                                              @ApiParam(required = true, value = "扣款金额", name = "topUpMoney") @RequestParam Long deDuctMoney) {
        AccountWithoutResponse rd = new AccountWithoutResponse();
        ErrorCode result = ErrorCode.OK;
        try {
             accountWithOutService.deDuctMoney(userId,accountId,deDuctMoney);
        }catch(MyException e){
            result = e.getErrorCode();
            logger.error("删除仓库出错" + e, e);
        }catch (Exception e){
            result = ErrorCode.ERROR;
            logger.error("服务器错误" + e, e);
        }
        rd.setErrorCode(result.value);
        rd.setValue(result.memo);
        return rd;
    }
}
