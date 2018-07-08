import {app} from '../main'
/**
 *
 * @param namespace
 * @param modelCatchMap
 */
export default (namespace, modelCatchMap) => (target, key, descriptor) => {
    const method = descriptor.value;
    let ret;
    descriptor.value = (argu = []) => {
        const getModel = require(`../model/${namespace}`).default;
        if (!~modelCatchMap.indexOf(namespace)) {
            const model = getModel(namespace)
            app.model(model)
            modelCatchMap.push(namespace);
        }
        ret = method.apply(target,[namespace,...argu]);
        return ret;
    }
    return descriptor
}