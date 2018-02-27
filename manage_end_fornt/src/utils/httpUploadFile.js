  /**
   people: liutong,
   changeTime: 2018-01-25 14:46:12,
   description: ;
 **/
import {REQUEST_URL} from '../config'

export default function(files,cb){

  const formData = new FormData(),
        request = new XMLHttpRequest();

  files.forEach(function(i){ formData.append("file",i) });

  request.open("POST", `${REQUEST_URL}/file/uploadfile`);

  request.send(formData);

  request.onload = function(){

    cb("success",JSON.parse(decodeURIComponent(request.responseText)))

  };

  request.onerror = function(err){ cb("error",err); };

  request.ontimeout = function(err){ cb("timeout",err); };

  return request;

}
