'use strict';

const { getPluginService } = require('../util/getPluginService');
const { isMatch } = require('../util/isMatch');

const transform = async (strapi, ctx, next) => {
	const settings = getPluginService('settingsService').get();

	await next();

	// ensure body exists, occurs on non existent route
	if (!ctx.body) {
		return;
	}

	// only matches process  requests.
	if (isMatch(ctx, settings.prefix)) {
		let data = ctx.body.data || ctx.body;
		ctx.body = {
			data: getPluginService('transformService').response(settings, data)
		};
	}
};

module.exports = ({ strapi }) => {
	strapi.server.use((ctx, next) => transform(strapi, ctx, next));
};
