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

		var _new = {
			...object,
			..._.get(object,key)
		};

		if(_.has(object, key) && !Object.hasOwnProperty.call(object, key)){
			
			delete _new[key.split('.')[0]];

		}else if(Object.hasOwnProperty.call(object, key)){

			delete _new[key];

		}

		return _new;
		
 	}
	
	return object;

};

module.exports = {
	removeObjectKey,
};
