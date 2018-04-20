/**
 * @params
 * 1. source {dataObject} allow all javascript of data type.
 * 2. rules { Object{ruleObject} | Array[ruleObject] }
 *      ruleObj ======> {
 *           max: Number,
 *           min: Number,
 *           pattern: RegExp
 *           enum: String
 *           len: Number,
 *           meg: String,
 *           required: Boolean,
 *           type: String,
 *           validator: Function
 *      }
 * @性能, @可读性, @容错性, @便捷性
 * @example
                                                                                                                       * verification("addasass",[{required:true,len:6}])
 */

const verification = (source, rules) => {
    const BASE_TYPE = {
        phone:/^$/,
        email: /^$/,
        password: /^$/,
        number: /^$/,
        empty: /^$/,
    }
    const RULE_MODAL = {
        max:{type: Number, verific: (max) => source < max},
        min: {type: Number, verific: (max) => true},
        pattern: {type: RegExp, verific: (pattern) => true},
        enum: {type: String, verific: (max) => true},
        len: {type: Number, verific: (len) => len === source.length},
        required: {type: Boolean, verific: (isRequired) => isRequired ? BASE_TYPE.empty.test(source) : true},
        type: {type: String, verific: (type) => BASE_TYPE[type].test(source) },
        validator: {type: Function, verific: (validatorFun) => validatorFun() }
    }
    for (let i = 0; i < rules.length; i++) {
        let ruleObjects = rules[i];
        for (let key in ruleObjects) {
            if (ruleObjects.isPrototypeOf(key)) continue;
            if (!(key in RULE_MODAL)) { throw Error('asd')}
            const ruleValue = ruleObjects[key]
            const isQualified = RULE_MODAL[key].verific(ruleValue)
            if (!isQualified) {
                return {msg: ruleObjects.msg || ''}
            }
        }
    }
}

console.log(verification('asdasd', [{required: true, msg: '必须'}, {len: 6, msg: '最大数为10'}]));