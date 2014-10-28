'use strict';

describe('Transform date service', function () {

    var HttpTransformDate,
        onlyDateFormat = 'YYYY-MM-DD';

    beforeEach(module('angular-http-transform-date'));

    beforeEach(inject(function (_HttpTransformDate_) {
        HttpTransformDate = _HttpTransformDate_;
    }));

    it('should be defined', function () {
        //Assert
        expect(HttpTransformDate).toBeDefined();
    });

    it('should be able to transform date variable to date format', function () {
        //Arrange
        var date = new Date();

        //Act
        var transformed = HttpTransformDate.getDateOnly(date);

        //Assert
        expect(transformed).toEqual(moment(date).format(onlyDateFormat));
    });

    it('should be able to transform object property to date format', function () {
        //Arrange
        var date = new Date(),
            data = {
                date: date
            };

        //Act
        var transformed = HttpTransformDate.transformToDateOnly('date')(data);
        data.date = moment(date).format(onlyDateFormat);

        //Assert
        expect(transformed).toEqual(angular.toJson(data));
    });

    it('should be able to transform object property to ISO date format', function () {
        //Arrange
        var date = new Date(),
            data = {
                date: date
            };

        //Act
        var transformed = HttpTransformDate.transformToISODateTime('date')(data);
        data.date = moment(date).toISOString();

        //Assert
        expect(transformed).toEqual(angular.toJson(data));
    });

    it('should be able to transform object property to date from string in date format', function () {
        //Arrange
        var date = new Date(),
            dateString = moment(date).format(onlyDateFormat),
            data = {
                date: dateString
            };

        //Act
        var transformed = HttpTransformDate.transformFromString('date')(data);

        //Assert
        expect(transformed.date).toEqual(new Date(dateString));
    });

    it('should be able to transform object sub property to date format', function () {
        //Arrange
        var date = new Date(),
            data = {
                subProperty: {
                    date: date
                }
            };

        //Act
        var transformed = HttpTransformDate.transformToDateOnly('subProperty.date')(data);
        data.subProperty.date = moment(date).format(onlyDateFormat);

        //Assert
        expect(transformed).toEqual(angular.toJson(data));
    });

    it('should be able to transform complex object with sub properties to date format', function () {
        //Arrange
        var date = new Date(),
            data = {
                subProperty: {
                    subSubProperty: {
                        date: date
                    }
                }
            };

        //Act
        var transformed = HttpTransformDate.transformToDateOnly('subProperty.subSubProperty.date')(data);
        data.subProperty.subSubProperty.date = moment(date).format(onlyDateFormat);

        //Assert
        expect(transformed).toEqual(angular.toJson(data));
    });

    it('should be able to transform array of objects with date field to date format', function () {
        //Arrange
        var date = new Date(),
            data = [
                { date: date },
                { date: date }
            ];

        //Act
        var transformed = HttpTransformDate.transformToDateOnly('date')(data);
        for (var i = 0; i < data.length; i++) {
            data[i].date = moment(date).format(onlyDateFormat);
        }

        //Assert
        expect(transformed).toEqual(angular.toJson(data));
    });

    it('should be able to transform object with sub property as an array with date field to date format', function () {
        //Arrange
        var date = new Date(),
            data = {
                subProperty: [
                    { date: date },
                    { date: date }
                ]
            };

        //Act
        var transformed = HttpTransformDate.transformToDateOnly('subProperty.date')(data);
        for (var i = 0; i < data.subProperty.length; i++) {
            data.subProperty[i].date = moment(date).format(onlyDateFormat);
        }

        //Assert
        expect(transformed).toEqual(angular.toJson(data));
    });

    it('should be able to transform array of objects with sub property as an array with date field to date format', function () {
        //Arrange
        var date = new Date(),
            formattedDate = moment(date).format(onlyDateFormat),
            data = [
                {
                    subProperty: [
                        { date: date },
                        { date: date }
                    ]
                },
                {
                    subProperty: [
                        { date: date },
                        { date: date }
                    ]
                }
            ];

        //Act
        var transformed = HttpTransformDate.transformToDateOnly('subProperty.date')(data);
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].subProperty.length; j++) {
                data[i].subProperty[j].date = formattedDate;
            }
        }

        //Assert
        expect(transformed).toEqual(angular.toJson(data));
    });
});