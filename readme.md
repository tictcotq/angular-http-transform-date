# Angular HTTP Transform Date

## About
*Angular HTTP Transform Date* is a module for [AngularJS](https://angularjs.org/).  
It automatically converts ISO-formatted date strings into Date objects when you receive JSON response from your server.  
The same way it converts Date objects into properly formatted ISO strings when you make a request.


## Usage

*Angular HTTP Transform Date* internally uses [$http](https://docs.angularjs.org/api/ng/service/$http) transformations.  
You only need let it know which properties should be transformed on request or response.

### Transform ISO string to Date object in response's data

Use ``transformResponse`` when you need to convert JSON response:
```
$http.get('api/resource', { transformResponse: HttpTransformDate.transformFromString('created', 'updated')})
```

### Transform Date to ISO string on request
For requests containing Date objects use ``transformRequest``:
```
$http.post('api/resource', resource, { transformRequest: HttpTransformDate.transformFromString('created', 'updated')});
```

### Nested and array properties

You may use this methods with nested properties as well as array.  
Use dot notation to specify what should be converted. When applied to array, transformation will be applied to each element in array.  
``$http.get('api/resource', { params: params,  transformRequest: HttpTransformDate.transformFromString('items.created', 'items.updates')});``

## License
MIT