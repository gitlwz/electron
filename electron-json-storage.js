const {app, BrowserWindow} = require('electron');
const storage = require('electron-json-storage');

console.log("获取默认数据路径",storage.getDefaultDataPath())

console.log("777",app.getPath('temp'));
//return;
storage.setDataPath(storage.getDefaultDataPath() + '/user')   //设置当前路径

console.log("获取当前用户数据路径",storage.getDataPath())

storage.set('foobar', { foo: 'bar' }, function(error) {
  	if (error) throw error;
});
return;

//读取用户数据
storage.get('foobar', function(error, data) {
  	if (error) throw error;
 
  	console.log("获得的数据-》",data);
});




//读取许多用户数据密钥
storage.getMany([ 'foobar', 'barbaz' ], function(error, data) {
  if (error) throw error;
 
  console.log(data.foobar);
  console.log(data.barbaz);
});

//读取所有用户数据
storage.getAll(function(error, data) {
  if (error) throw error;
 
  console.log(data);
});

//写入用户数据
storage.set('foobar', { foo: 'bar' }, function(error) {
  	if (error) throw error;
});

//检查一个密钥是否存在
storage.has('foobar', function(error, hasKey) {
  if (error) throw error;
 
  if (hasKey) {
    console.log('There is data stored as `foobar`');
  }
});

//获取保存的密钥列表
storage.keys(function(error, keys) {
  if (error) throw error;
 
  for (var key of keys) {
    console.log('There is a key called: ' + key);
  }
});

//删除一个关键
storage.remove('foobar', function(error) {
  if (error) throw error;
});


//清除当前用户数据路径中的所有存储数据
storage.clear(function(error) {
  if (error) throw error;
});