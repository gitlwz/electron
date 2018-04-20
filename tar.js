const tar = require('tar');
tar.create({
	gzip: true,
	file: `./upgrade.tar.gz`,
	cwd: './build'
}, ['package.json', 'pagesQuantdoFinally']).then(() => { // 保存 package.json 和 src 目录
	//...
});
