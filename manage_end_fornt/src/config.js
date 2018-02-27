const REQUEST_URL = 'http://120.78.12.39:8090';
const UPDATE_FILE_URL = `${REQUEST_URL}/file/uploadfile`;

if (process.env.NODE_ENV === "PRODUCTION") {

} else{

}

module.exports = {UPDATE_FILE_URL,REQUEST_URL};