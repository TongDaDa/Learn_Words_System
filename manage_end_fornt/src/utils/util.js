/**
     people: liutong,
     changeTime: 2018-01-16 17:21:06,
     description: utils ;
 **/

export function omit(obj, fields) {
    let copy = Object.assign({}, obj);
    for (let i = 0; i < fields.length; i++) {
        let key = fields[i];
        delete copy[key];
    }
    return copy;
}

export function splitObject (obj,list){
    const left = {};
    const right = {};

    Object.keys(obj).forEach((m)=>{
        if(list.indexOf(m) !== -1){
            left[m] = obj[m];
        }else{
            right[m] =obj[m];
        }
    });
    return [left,right];
}

export function addRowsKey(data){
    for(let i=0; i<data.length; i+=1){
        data[i].key = i;
    }
    return data || [];
}

export function removeRowsKey(data) {
    for(let i=0; i<data.length; i+=1){
        if (data[i].key) {
            delete data[i]
        }
    }
    return data || [];
}

export function dateFormat(time){
    if(time == undefined || time == null ||time == "")return;
    let zero=(n)=>{
        return n = n>0&&n<10 ? "0"+n : n;
    };
    let y = new Date(time).getFullYear();
    let m = new Date(time).getMonth() + 1;
    let d = new Date(time).getDate();
    return zero(y)+"-"+zero(m)+"-"+zero(d)
};