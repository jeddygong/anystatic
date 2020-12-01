/*
 * @description:
 * @author: Jeddy
 * @Date: 2020-11-29 17:27:11
 * @LastEditors: Jeddy
 * @LastEditTime: 2020-12-01 22:52:47
 */

const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");

const promisify = require("util").promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

const { mime, fileType } = require('./mime');
const compress = require('./compress');
const range = require('./range');
const isCache = require('./cache');

const tplPath = path.join(__dirname, "../template/dir.tpl");
const source = fs.readFileSync(tplPath, 'utf8');
const template = Handlebars.compile(source);


module.exports = async (req, res, filePath, configs) => {
	try {
		const stats = await stat(filePath);

		if (stats.isFile()) {
			const contentType = mime(filePath);
			res.setHeader('Content-Type', contentType);

			if (isCache(stats, req, res)) {
				res.statusCode = 304;
				res.end();
				return
			}

			// 可能只会读取部分文件, 也就是range
			let rs;
			const { code, start, end } = range(stats.size, req, res);
			if (code === 200) {
				res.statusCode = 200;
				rs = fs.createReadStream(filePath);
			} else {
				res.statusCode = 206;
				rs = fs.createReadStream(filePath, {start, end})
			}

			if (filePath.match(configs.compress))  {
				rs = rs.pipe(compress(req, res));
			}
			rs.pipe(res);

		} else if (stats.isDirectory()) {
			const files = await readdir(filePath);
			res.statusCode = 200;
			res.setHeader('Content-Type', 'text/html');
			const dir = path.relative(configs.root, filePath);

			for (let i = 0; i < files.length; i++) {
				let fileSub = files[i];
				if (fileSub.substr(0,1) === '.') {
					files.splice(i,1);
					i--;
				}
			}


			const data = {
				title: path.basename(filePath),
				dir: dir ? `/${dir}` : '',
				files: files.map((file) => {
					return {
						file,
						icon: mime(file)
					}
				}),
			}
			res.end(template(data));
		}

	} catch (error) {
		res.statusCode = 404;
		res.setHeader("Content-Type", "text/plain");
		res.end(`${filePath} is not a directory or file! ${error}`);
	}
}
