'use strict';

const _ = require('lodash');


/**
 * 
 * @param {Object} object 
 * @param {String} key 
 * @param {{}} def define default if value is empty
 * @returns {{}}
 * 
 */

const removeObjectKey = (object, key) => {
	
	if(object && key && _.isObject(object)){

		if(_.has(object, key) && !Object.hasOwnProperty.call(object, key)){

			var _new = {
				...object,
				..._.get(object,key)
			};

			delete _new[key.split('.')[0]];
 
			return _new;

		}else if(_.has(object, key)){

			return {
				..._.get(object,key)
			};

		}
		
 	}
	
	return object;

};

module.exports = {
	removeObjectKey,
};
