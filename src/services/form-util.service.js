'use strict';

angular
	.module('restak')
	.factory('formUtil', function() {

		var service = {
			serverErrorTypeMapping: {
				'any.required': 'required',
				'any.empty': 	'required',
				'string.base': 	'required',
				'string.email': 'required',
				'date.base': 	'required',
				'number.base': 	'required',
				'entity.unknown': 'unknown',
				'non-unique': 'nonUnique'
			}
		};

		service.findErrorType = function(t){
			
			if(service.serverErrorTypeMapping[t])
				return service.serverErrorTypeMapping[t];

			return t;
		};

		service.handleFormErrors = function(form, serverResponse, topLevelField){

			var validationErrors = [];

			if(serverResponse && serverResponse.data && serverResponse.data.payload)
				validationErrors = serverResponse.data.payload['validation-errors'];

			// Reset any current errors
			var current = form.$error;
			Object.keys(current).forEach(function(type){
				// forEach does not work because the underlying array is modified when calling $setValidity
				while((current[type] || []).length > 0){
					current[type][0].$setValidity(type, true, form);
				}
			});
			
			// Set validation errors from server response
			(validationErrors || []).forEach(function(ve){
				var field = form[ve.field] || form[topLevelField];
				ve.types.forEach(function(type){
					if(field)
						field.$setValidity(service.findErrorType(type), false, form);
				});
			});
		};

		return service;
	});