/**
 * @description: 入口文件
 * @author: Jeddy
 * @Date: 2020-11-30 21:25:13
 */

const yargs = require("yargs");
const Server = require("./helper/server");

const args = yargs
	.usage("anystatic [options]")
	.option("p", {
		alias: "port",
		describe: "端口号",
		default: 2018
	})
	.option("h", {
		alias: "hostname",
		describe: "host",
		default: "127.0.0.1"
	})
	.option("d", {
		alias: "root",
		describe: "root path",
		// eslint-disable-next-line no-undef
		default: process.cwd()
	})
	.version()
	.alias("v", "version")
	.help()
	.argv;

// console.info(args);
const server = new Server(args);
server.start();

// 增加执行权限
// chmod +x bin/anystatic
// ll bin/anystatic
