/*
 * @description: 默认配置
 * @author: Jeddy
 */
module.exports = {
	compress: /\.(html|js|css|md)/,
	cache: {
		maxAge: 10 * 60 * 1000,
		expires: true,
		cacheControl: true,
		lastModified: true,
		etag: true
	}
};
