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

	// only process api requests.
	if (isMatch(ctx, settings.prefix)) {
		const { data } = ctx.body;

		// ensure no error returned.
		if (data) {
			ctx.body['data'] = getPluginService('transformService').response(settings, data);
		}
	}
};

module.exports = ({ strapi }) => {
	strapi.server.use((ctx, next) => transform(strapi, ctx, next));
};
