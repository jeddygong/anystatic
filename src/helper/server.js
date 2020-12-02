/*
 * @Description:
 * @Author: Jeddy
 * @Date: 2020-07-14 22:14:59
 * @LastEditors: Jeddy
 * @LastEditTime: 2020-12-02 23:25:31
 */

const http = require("http");
const chalk = require("chalk");
const path = require("path");
const route = require("./route");
const openBrowser = require("./openBrowser");

const conf = require("./../config/defaultConfig");

class Server {
	constructor (configs) {
		this.configs = Object.assign({}, conf, configs);
		// console.log(this.configs);
	}

	start () {
		const server = http.createServer((req, res) => {
			// root: 当前工作的目录路径 , 当前的路径;
			// return 返回整个路径
			const filePath = path.join(this.configs.root, req.url);

			route(req, res, filePath, this.configs);

		});

		server.listen(this.configs.port, this.configs.hostname, () => {
			const addr = `http://${this.configs.hostname}:${this.configs.port}`;
			console.info(`Server started at ${chalk.green(addr)}`);
			openBrowser(addr);
		});
	}
}

module.exports = Server;




