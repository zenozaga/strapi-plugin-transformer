'use strict';

const isMatch = (ctx, prefix = '/api/') =>
	ctx.request && ctx.request.url && ctx.request.url.indexOf(prefix) !== -1;

module.exports = {
	isMatch,
};

