'use strict';

angular.module('example').factory('ResourceService', function ($http, HttpTransformDate) {
    return {

        getResource: function (resourceId) {
            //Transforms response from the server.
            //Properties "created" and "updated" will be converted from ISO strings to Date objects.
            return $http.get('api/resource/' + resourceId, { transformResponse: HttpTransformDate.transformFromString('created', 'updated')});
        },

        saveResource: function (resource) {
            //Converts request data before it is sent to the server.
            //Date properties "created" and "updated" will be converted to ISO-formatted strings.
            return $http.post('api/resource', resource, { transformRequest: HttpTransformDate.transformFromString('created', 'updated')});
        },

        searchResource: function (params) {
            //You may convert plain, nested or array properties.
            //Use dot to indicate nesting.
            return $http.get('api/resource', { params: params,  transformRequest: HttpTransformDate.transformFromString('items.created', 'items.updates')});
        }

    };
});