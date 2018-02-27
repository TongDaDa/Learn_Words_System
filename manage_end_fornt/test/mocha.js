/**
 people: liutong, changeTime: 2018-01-26 10:14:18, description: ;
 **/

/**
 * @param tableData
 * @param isRender
 */
transformTableData = (tableData,isRender)=>{
    const copyTableData = JSON.parse(JSON.stringify(tableData))
    const type = isRender ? 'attributeValue' : 'id'
    copyTableData.forEach((i,k)=>{
        Object.keys(copyTableData[k]).forEach((i)=>{
            copyTableData[k][i] = copyTableData[k][i][type]
        })
    })
    return copyTableData
}

/**
 * @param tableData
 * @param isRender
 */
transSelectedKeys = (arr)=>{
    let _arr = [];
    if (arr.length <= 1) { return arr; }
    for (let i = 0; i < arr.length; i++) {
        let s = [];
        for (let j = 1; j <= arr[i]; j++) {
            s.push(j);
        }
        _arr.push(s);
    }
    let p =  _arr.reduce(function (pre, cur) {
        let a = [];
        for (let i = 0; i < pre.length; i++) {
            for (let j = 0; j < cur.length; j++) {
                a.push([].concat(pre[i], cur[j]))
            }
        }
        return a;
    })
    return p
}