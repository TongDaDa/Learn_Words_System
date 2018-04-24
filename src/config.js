let REQUEST_URL =  'http://39.107.66.37:8889/:8899';
if (process.env.NODE_ENV !== "PRODUCTION") {
    REQUEST_URL = 'http://127.0.0.1:8899'
}
const UPDATE_FILE_URL = `${REQUEST_URL}/file/uploadfile`;

module.exports = {UPDATE_FILE_URL,REQUEST_URL};