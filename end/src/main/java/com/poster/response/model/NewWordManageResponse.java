package com.poster.response.model;
import com.poster.entity.NewWordManage;
import io.swagger.annotations.ApiModel;
import java.util.List;

@ApiModel("单词管理")
public class NewWordManageResponse extends BaseResponse {
    private List<NewWordManage> wordList;
    private NewWordManage wordModal;

    public List<NewWordManage> getWordList() {
        return wordList;
    }

    public void setWordList(List<NewWordManage> wordList) {
        this.wordList = wordList;
    }

    public NewWordManage getWordModal() {
        return wordModal;
    }

    public void setWordModal(NewWordManage wordModal) {
        this.wordModal = wordModal;
    }
}
