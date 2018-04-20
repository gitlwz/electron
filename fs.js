  
var request = require('request');  

var progress = require('progress-stream');  
var fs = require('fs');  
var tZip = fs.createWriteStream('./aa');
var proStream = null; 
proStream = progress({  
        length: 230675187,  
    		time: 100/* ms */  
    	});
    proStream.on('progress', function(progress) {  
        var percentage = Math.round(progress.percentage)  
        console.log("-----",percentage)
    	});
request
.get({
	    url: 'http://download.dcloud.net.cn/HBuilder.9.0.2.windows.zip',
	    encoding: null  // encoding 为 null 使 body 生成为一个 Buffer
	},function(error, response, body){
			console.log("777777")
	})
.on('error', function(err) {
    console.log(err)
 })
.on("response",function(response){
		console.log(response.headers['content-length'])
		
	})
.pipe(proStream)
.pipe(tZip)