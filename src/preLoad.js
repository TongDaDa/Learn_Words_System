import {b64EncodeUnicode} from 'utils/toBase64'

(function test() {
    const scripts = document.getElementsByTagName("SCRIPT");
    const STORAGE_KEY = "CATCH_MANIFEST"
    const currentManifest = getCurrentManifest();

    if (isNoLastest(STORAGE_KEY)) { updateView(); }

    updateLocalStoreVerson(STORAGE_KEY);

    function updateView() {
        const root = document.getElementById("root")
        const div = document.createElement("DIV")
        const LoadingQL = `
           <div class="football allScreen">
                <div class="ball"></div>
                <div class="shadow"></div>
                <p>Now Loading ...</p>
            </div>
        `
        div.innerHTML = LoadingQL;
        root.appendChild(div)
    }

    function getCurrentManifest() {
        const HTTP_REX = /^http{1}s?\:{1}\/\/[\.\w]+(\:\d{2,6}|\.com)/
        const FILE_REX = /^\/?manifest.\w+\.js$/
        for (let i = 0; i < scripts.length; i++) {
            let scriptSrc = scripts[i].src;
            let httpPortionIndex = scriptSrc.match(HTTP_REX)
            if (!scriptSrc || !httpPortionIndex) { return null }
            httpPortionIndex = httpPortionIndex[0].length;
            if (!!~httpPortionIndex) {  //如果可以匹配 http 前部分
                const scriptEnd = scriptSrc.substr(httpPortionIndex)
                if (FILE_REX.test(scriptEnd)) {
                    return scriptSrc
                }
                return null
            }
        }
        return null;
    }

    function updateLocalStoreVerson (key) {
        currentManifest && window.localStorage.setItem(key, b64EncodeUnicode(currentManifest))
    }

    function isNoLastest(key) {
        const preManifest = window.localStorage.getItem(key)
        console.log(b64EncodeUnicode(currentManifest), preManifest);
        if (b64EncodeUnicode(currentManifest) !== preManifest) {
            return true;
        }
    }

})()
