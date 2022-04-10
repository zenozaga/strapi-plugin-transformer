'use strict';

const _ = require('lodash');
const { removeObjectKey } = require('../util/removeObjectKey');


/**
 * 
 * @param {*} data 
 * @param {*} keys 
 * @returns {object} transformed data
 * 
 */
function traverse(data, keys = []){

	if(keys && keys.length && Object.keys(data).length && typeof data == 'object'){

		for (let index = 0; index < keys.length; index++) {

			if (_.has(data,keys[index])) {
				return traverse(removeObjectKey(data, keys[index]), keys);
			}	
		}
		
		// match keys in Array
		if(_.isArray(data)) return data.map(item => traverse(item, keys));
		
		// match keys in Object
		if(_.isObject(data)) return Object.keys(data).reduce((acc, key) => {
			acc[key] = traverse(data[key], keys);
			return acc;
		}, {});
	}

 	return data;		
}

module.exports = () => ({

	/**
	 *
	 * @param {object} transforms
	 * @param {object} data
	 * @returns {object} transformed data
	 */
	transformResponse: (transform, data) => traverse(data, transform.keys),

	response(settings, data) {
		
		if (settings && settings.responseTransforms) {
			data = this.transformResponse(settings.responseTransforms, data);
		}

		return data;
	},
});
