/*
 * @description:
 * @author: Jeddy
 * @Date: 2020-11-29 20:44:04
 * @LastEditors: Jeddy
 * @LastEditTime: 2020-12-01 22:52:27
 */
const { createGzip, createDeflate } = require("zlib");

module.exports = (req, res) => {
	const accepetEncoding = req.headers["accept-encoding"];

	// 如果没有设定压缩类型 或者压缩不匹配，则不压缩
	if (!accepetEncoding || !accepetEncoding.match(/\b(gzip|deflate)\b/)) {
		return null;

	// 如果设定的gzip压缩方式
	} else if (accepetEncoding.match(/\bgzip\b/)) {
		res.setHeader("Content-Encoding", "gzip");
		return createGzip();

	// 如果设定的deflate压缩方式
	} else if (accepetEncoding.match(/\bdeflate\b/)) {
		res.setHeader("Content-Encoding", "deflate");
		return createDeflate();
		// return rs.pipe(createDeflate());
	}

};
