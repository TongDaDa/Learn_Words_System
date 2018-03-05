package com.poster.response.model;

import com.poster.entity.RootWordManage;
import java.util.List;
import org.apache.catalina.LifecycleState;

public class RootWordManageResponse extends BaseResponse{
    private List<RootWordManage> rootWordList;
    private RootWordManage rootWordModal;

    public List<RootWordManage> getRootWordList() {
        return rootWordList;
    }

    public void setRootWordList(List<RootWordManage> rootWordList) {
        this.rootWordList = rootWordList;
    }

    public RootWordManage getRootWordModal() {
        return rootWordModal;
    }

    public void setRootWordModal(RootWordManage rootWordModal) {
        this.rootWordModal = rootWordModal;
    }
}
