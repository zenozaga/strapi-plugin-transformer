'use strict';

/**
 * 
 * @param {*} ctx 
 * @param {String|RegExp} prefix 
 * @returns {Boolean}
 * 
 * check if prefix match with url
 * 
 */

const isMatch = (ctx, prefix = '/api/') => {

	let url = ctx.request.url;
	if(prefix.constructor == RegExp) return prefix.test(url);
	return url.indexOf(prefix) > -1;
 
};

module.exports = {
	isMatch,
};

