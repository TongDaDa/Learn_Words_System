import {b64EncodeUnicode} from 'utils/toBase64'

(function test() {

    const scripts = document.getElementsByTagName("SCRIPT");
    const STORAGE_KEY = "CATCH_MANIFEST"
    const currentManifest = getCurrentManifest();

    if (isNoLastest(STORAGE_KEY)) { updateView(); }

    updateLocalStoreVerson(STORAGE_KEY);

    function updateView() {
        const root = document.getElementById("root")
        const div = document.createElement("DIV");
        const styleEle = document.createElement("STYLE");
        
        const CssAnimationQL = `
         @keyframes animation6 {
    20%{-webkit-transform:scale(1.2, 0.8);}
    45%{-webkit-transform:translate(0,-180%);}
    80%{-webkit-transform:translate(0,-200%);}
    85%{-webkit-transform:translate(0,-180%);}
  }
  @keyframes animation6-shadow{
    30%{-webkit-transform:scale(1.2);}
    55%{-webkit-transform:scale(0.5);opacity:0.5;}
    90%{-webkit-transform:scale(0.4);opacity:0.4;}
  }
  .football .ball{
    position: relative;
    z-index: 2;
    width: 58px;
    height: 57px;
    margin: 0 auto -3%;
    background: url(../../assets/img/icon_ball.png) no-repeat center 0;
    background-size: contain;
    -webkit-animation: animation6 1s ease-in-out infinite;
    animation: animation6 1s ease-in-out infinite;
    -webkit-animation-delay: -0.7s;
    animation-delay: -0.7s;
  }
  .football.allScreen {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,20%);
  }
  .football .shadow {
    position: relative;
    z-index: 1;
    width: 58px;
    height: 25px;
    margin: auto;
    border-radius: 50%;
    background-color: #707070;
    -webkit-animation: animation6-shadow 1s infinite;
    animation: animation6-shadow 1s infinite;
    -webkit-animation-delay: -0.7s;
    animation-delay: -0.7s;
  }`
        const LoadingQL = `
            <div class="football allScreen">
                <div class="ball"></div>
                <div class="shadow"></div>
                <p>Now Loading ...</p>
            </div>
        `
        div.innerHTML = LoadingQL;
        styleEle.innerText = CssAnimationQL;
        document.head.insertBefore(styleEle)
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
