'use strict';

angular.module('restak').factory('urlBuilder', function($httpParamSerializer) {
    
    // http://stackoverflow.com/questions/12808779/how-to-programatically-create-urls-with-angularjs
    
    function buildUrl(url, params) {
        var serializedParams = $httpParamSerializer(params);

        if (serializedParams.length > 0) {
            url += ((url.indexOf('?') === -1) ? '?' : '&') + serializedParams;
        }

        return url;
    }

    return buildUrl;
});