// let REQUEST_URL =  'http://39.107.66.37:8899';
let REQUEST_URL = '/api'
// if (process.env.NODE_ENV !== "PRODUCTION") {
    // REQUEST_URL = 'http://127.0.0.1:8899'
    // REQUEST_URL = '/api'
// }//asdasd

const UPDATE_FILE_URL = `${REQUEST_URL}/file/uploadfile`;

module.exports = {UPDATE_FILE_URL,REQUEST_URL};