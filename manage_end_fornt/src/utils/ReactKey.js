/**
 * Created by Administrator on 2017/3/17 0017.
 */
let ReactKey = {
    i: 10000,
    get key() {
        return ++this.i;
    }
};

export default ReactKey;