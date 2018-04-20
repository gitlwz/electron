const {app, BrowserWindow} = require('electron');
let win;
let fs = require('fs-extra');  // 用于扩展内置 fs 方法
let request = require('request');  // 用于发起下载请求
let tar = require('tar');  // 用于执行 tar 解压缩
require("./electron-json-storage.js")
let windowConfig = {
    width:800,
    height:600
};

function createWindow(){
    win = new BrowserWindow(windowConfig);
    win.loadURL(`file://${__dirname}/index.html`);
    //开启调试工具
    win.webContents.openDevTools();
    win.on('close',() => {
        //回收BrowserWindow对象
        win = null;
    });
//  win.on('resize',() => {
//      win.reload();
//  })
}

app.on('ready',createWindow);
app.on('window-all-closed',() => {
    app.quit();
});

app.on('activate',() => {
    if(win == null){
        createWindow();
    }
})


return;
/*-----------------热更新--------------*/
let locaVersion = app.getVersion();
let lineVersion ;

//版本号比较
const compareVersion = (v1, v2) => {
  const vs1 = v1.toString().split('.'), vs2 = v2.toString().split('.');
  if (vs1.length !== vs2.length) {
    // 版本格式不一致
    return true;
  }
  for (let i = 0; i < vs1.length; ++i) {
    let diff = parseInt(vs2[i], 10) - parseInt(vs1[i], 10);
    if (diff < 0) {
      // vs1 其中一个版本号段小于 vs2
      return false;
    }
    if (diff > 0) {
      // vs2 其中一个版本号段大于 vs1
      return true;
    }
  }
  // 版本一致
  return false;
};


var https = require('https');

var getHttpsData = function (success, error) {
  // 回调缺省时候的处理
  success = success || function () {};
  error = error || function () {};

  var url = 'https://raw.githubusercontent.com/gitlwz/electron-version/master/version.js?r=' + Math.random();

  https.get(url, function (res) {
    var statusCode = res.statusCode;

    if (statusCode !== 200) {
        // 出错回调
        error();
        // 消耗响应数据以释放内存
        res.resume();
        return;
    }

    res.setEncoding('utf8');
    var rawData = '';
    res.on('data', function (chunk) {
      rawData += chunk;
    });

    // 请求结束
    res.on('end', function () {
      // 成功回调
      success(rawData);
    }).on('error', function (e) {
      // 出错回调
      error();
    });
  });
};
getHttpsData(function(data){
	lineVersion = JSON.parse(data).version;
	console.log(compareVersion(locaVersion,lineVersion))
	// 下载热更新包代码
if(compareVersion(locaVersion,lineVersion)){


	new Promise((resolve, reject) => {
	request({
	    url: 'https://github.com/gitlwz/electron-version/raw/master/update/upgrade_tar.tar.gz',
	    encoding: null  // encoding 为 null 使 body 生成为一个 Buffer
	}, (error, res, body) => {
		console.log("========",body)
//	    try {
//		    if (error || res.statusCode !== 200) {
//		        throw '请求失败';
//		     }
//			      // 保存到临时目录，temp 为 Electron 用户可写目录
//			      let tempPath = app.getPath('temp');
//			      console.log("--------",tempPath)
//			      
//			      let dir =`${tempPath}/index.html`;
//			      fs.ensureFileSync(dir);
//
//
//			      // 创建 Buffer 流并解压
//			      let stream = new require('stream').Readable();
//			      var writerStream = fs.createWriteStream(dir);
//			      stream.push(body);
//			      stream.push(null);
//			      stream.pipe(writerStream).on('close', (a) => {
//			      	console.log("6666666",__dirname + "/aa.html");
//			        // 解压完毕，复制更新文件
//			        fs.copySync(dir, __dirname + "/index.html");  // 解压至指定的目录，这里用 __dirname 为例
//			        console.log("---22224444444-----")
//			        fs.removeSync(dir);  // 删除临时目录
//////			        // 返回 true 表示需要重启
//			        resolve(true);
//						console.log("--------")
//			      });
//	    } catch (e) {
//	    	console.log("----22222----")
//	      reject('更新文件下载失败，请联系管理员');
//	    }

		try {
		      if (error || res.statusCode !== 200) {
		        throw '请求失败';
		      }
		      // 保存到临时目录，temp 为 Electron 用户可写目录
		      let tempPath = app.getPath('temp');
		      let dir = fs.mkdtempSync(`${tempPath}/upgrade_`);
		      // 创建 Buffer 流并解压
		      let stream = new require('stream').Readable();
		      stream.push(body);
		      stream.push(null);
		      console.log('-------')
		      console.log(dir)
		      console.log(tempPath)
		      stream.pipe(tar.extract({
		        sync: true,
		        cwd: dir
		      })).on('close', () => {
		        // 解压完毕，复制更新文件
		        console.log('222222222')
		        console.log(__dirname)
		        fs.copySync(dir, __dirname);  // 解压至指定的目录，这里用 __dirname 为例
		        fs.removeSync(dir);  // 删除临时目录
		        // 返回 true 表示需要重启
		        console.log('-------')
		        resolve(true);
		      });
	    } catch (e) {
	      	reject('更新文件下载失败，请联系管理员');
	    }
	})
}).then(result => {
  if (result) {
    app.relaunch({ args: process.argv.slice(1) });  // 重启
    app.exit(0);
  }
}).catch(e => {
  // e 错误
});
}
});
