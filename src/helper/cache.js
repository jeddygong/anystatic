/*
 * @description:
 * @author: Jeddy
 * @Date: 2020-11-29 22:47:55
 * @LastEditors: Jeddy
 * @LastEditTime: 2020-12-01 22:48:55
 */

const { cache } = require("./../config/defaultConfig");

// 每次的一个响应
function refreshRes(stats, res) {
	const { maxAge, expires, cacheControl, lastModified, etag } = cache;

	if (expires) {
		res.setHeader("Expires", new Date(Date.now() + maxAge).toUTCString());
	}

	if (cacheControl) {
		res.setHeader("Cache-Control", `public, max-age=${maxAge}`);
	}

	if (lastModified) {
		res.setHeader("Last-Modified", stats.mtime.toUTCString());
	}

	// etag生成可以用其它的插件来hash
	if (etag) {
		res.setHeader("ETag", `${stats.size}-${stats.mtime}`);
	}
}

module.exports = (stats, req, res) => {
	refreshRes(stats, res);

	// 时间校验：获取客户端的上次获取时间，也就是说从这个时间开始，你服务器有没有修改过文件
	const lastModified = req.headers["if-modified-since"];
	// 哈希校验：服务器哈希数值的校验，上面的是时间校验
	const etag = req.headers["if-none-match"];

	// 都没有一般代表第一次请求
	if (!lastModified && !etag) {
		return false;
	}

	if (lastModified && lastModified !== res.getHeader("Last-Modified")) {
		return false;
	}

	return true;
};
