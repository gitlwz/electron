
/*
 * 
rimraf out && cross-env NODE_ENV=production && 
electron-packager ./ appname --platform=win32 --arch=x64 --win32metadata.FileDescription='' --overwrite 
--ignore=node_modules/electron-* --ignore=node_modules/.bin --ignore=.git --ignore=out --no-prune 
--electron-version=1.7.9 --out=out --icon=assets/app-icon/win/app.ico --asar
 * 
 * 
 * 
"packager": "electron-packager ./app HelloWorld --all --out ./OutApp --version 1.4.0 --overwrite --icon=./app/img/icon/icon.ico"


 * 
 * 
 * 
rimraf 一个豪华版本的rm -rf，兼容window。
cross-env 一个豪华版本的环境变量设置，有NODE_ENV=*的地方，就可以考虑使用cross-env，兼容window。
./，一般为package.json的位置。具体可以见这里：https://newsn.net/say/electron-quick-start-modify.html
appname，这个会影响你打包完毕的可执行文件（exe/dmg）的名字（appname.exe）。
--platform,确定了你要构建哪个平台的应用（Windows、Mac 还是 Linux）
--arch，决定了使用 x86 还是 x64 还是两个架构都用。这里有详细解释：https://newsn.net/say/electron-packager-basic.html
--win32metadata.FileDescription，文件描述信息。见这里：https://newsn.net/say/electron-packager-exe-info.html
--overwrite，是否覆盖原有的生成文件。它和下面几项有关系：--out=out、--ignore=out、rimraf out。
--ignore，要排除掉的不打包的文件，可以叠加效果。主要是出于减少最终文件大小的考虑。
--no-prune，这个参数请慎用，是说不处理node_modules里面dev依赖包，把相关的代码都放进最终asar里面。默认情况下，是会将dev相关的node_modules里面的包给去除之后，再打包的。注意：目前的最新版electron-packager里面没有--prune参数。
--electron-version，指定打包时使用的electron的版本。见这里：https://newsn.net/say/electron-packager-control-version.html 。注意：最新版的electron-packager没有--version参数。
--out打包完的可执行文件，放在在哪里。
--icon设置打包的时候的图标。敲黑板重点，天天有人问如何更换这个图标，就这里更换。图标制作的问题，请参见：https://newsn.net/say/electron-mac-icns.html 和 https://newsn.net/say/electron-ico-format.html 。图标都是特制的图标，妄图不制作图标就能完美无缺更换的想法，都是徒劳的。千万牢记。
--asar打包选项，是否在resource文件夹下面，生成app.asar文件。否则将会是个app文件夹加上自己的代码文件。
 * 
 * 
 * 
 * 
 * 
cnpm run-script packager
 * 
 */
