'use strict';

angular.module('angular-http-transform-date', []).factory('HttpTransformDate', [
    function () {
        var onlyDateFormat = 'YYYY-MM-DD';

        function traverseProperties(data, properties, modifier) {
            angular.forEach(properties, function (prop) {
                transformProperty(data, prop);
            });

            function transformProperty(data, prop) {
                if (angular.isArray(data)) {
                    angular.forEach(data, function (dataItem) {
                        transformProperty(dataItem, prop);
                    });
                }

                var propFormat = /^(\w+?)((\.\w+)*?)$/g,
                    match = propFormat.exec(prop),
                    topProp = match && match[1],
                    subProp = match && match[2] && match[2].substring(1);

                if (!topProp) {
                    return;
                }

                if (subProp) {
                    if (angular.isObject(data[topProp])) {
                        transformProperty(data[topProp], subProp);
                    }
                } else {
                    if (data[topProp]) {
                        modifier(data, topProp);
                    }
                }
            }
        }

        return {
            transformToDateOnly: function () {
                var properties = arguments;

                return function (data) {

                    traverseProperties(data, properties, function (data, prop) {
                        var date = moment(data[prop]);
                        if (data[prop] && date.isValid()) {
                            data[prop] = date.format(onlyDateFormat);
                        }
                    });

                    return angular.toJson(data);
                };
            },
            transformToISODateTime: function () {
                var properties = arguments;

                return function (data) {

                    traverseProperties(data, properties, function (data, prop) {
                        var date = moment(data[prop]);
                        if (data[prop] && date.isValid()) {
                            data[prop] = date.toISOString();
                        }
                    });

                    return angular.toJson(data);
                };
            },
            getDateOnly: function (date) {
                if (!date) {
                    return null;
                }
                date = moment(date);
                return date.isValid() ? date.format(onlyDateFormat) : null;
            },

            transformFromString: function () {
                var properties = arguments;

                return function (data) {
                    try {
                        var parsed = angular.fromJson(data);
                        data = parsed;
                    } catch (e) {
                    }
                    traverseProperties(data, properties, function (data, prop) {
                        var date = new Date(data[prop]);
                        if (data[prop] && date) {
                            data[prop] = date;
                        }
                    });

                    return data;
                };
            }
        };
    }
]);