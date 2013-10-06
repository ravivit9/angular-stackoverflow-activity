# Angular StackOverflow Activity [![Build Status](https://travis-ci.org/gigablox/angular-stackoverflow-activity.png)](https://travis-ci.org/gigablox/angular-stackoverflow-activity)

[Homepage](http://gigablox.github.io/angular-stackoverflow-activity/)

An [AngularJS](http://angularjs.org/) directive module for displaying a users public [StackOverflow activity](https://api.stackexchange.com/docs/timeline-on-users).

## Usage

1. `bower install --save angular-stackoverflow-activity`
2. Include [dependencies](#dependencies) in your HTML.
3. Use the `stackoverflow-activity` directive.

## Dependencies

These templates were built with *responsive design* in mind and require a dependency of [Bootstrap 3 CSS](http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css)

The `stackoverflow.activity` module requires a dependency of `ngResource` for service calls made to the StackOverflow API.

```html
<head>
<link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" />
<link href="stackoverflow-activity.css" /> <!-- Find this in /release -->
<link href="app.css" /> <!-- Your application css and bootstrap overrides -->
</head>

<body>
...
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0-rc.2/angular.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0-rc.2/angular-resource.min.js"></script>
<script src="stackoverflow-activity.js"></script> <!-- Find this in /release -->
<script src="app.js"></script> <!-- Your angular app -->
</body>
```


## Example

See the [homepage](http://gigablox.github.io/angular-stackoverflow-activity/) for a live example.

```html
<div stackoverflow-activity events="events" options="options"></div>
```

## Attributes

### `data`

The `data` attribute expects an array returned through the `StackoverflowActivityService` callback:

```js
StackoverflowActivityService.events({
  user:'gigablox',
  params:{
    
    //StackOverflow API support CORS as well 
    //https://api.stackexchange.com/docs
    callback:'JSON_CALLBACK', 
    
    //StackOverflow API rate limits to 10,000 requests per day
    //https://api.stackexchange.com/docs/throttle

    //If you need more you can generate a (key) for your app and is safe for client side code.
    //http://stackapps.com/apps/oauth/register
    key:'mykey123'
    
    //Indeed.
    site:'stackoverflow',
    
    //Will return additional event properties like URL's.
    //Required out of the box, but you can always customize templates to your liking to remove this dependency.
    filter:'unsafe',
  }
}).get().$promise.then(function(events){
  $scope.events = events.data;
});
```

### `options`

The `options` attribute expects an object that supports the following properties:

- *number* **limit**
 - Limits number of events rendered in array passed to `data`
 - If `null`, directive will render all events
  - Default: `null`

```js
$scope.settings = {
  limit:5
};
```

## Custom Templates

If you wish to change any of the templates or remove dependencies, feel free under `/src/views`.

You will then have to [build](#build) the project which will recompile the `/release`

## Build

To build a `/release` from scratch:

1. `npm install -g grunt-cli bower karma`
2. `cd angular-stackoverflow-activity`
3. `npm install`
4. `bower install`
5. `grunt release`

Alternatively, you can `grunt watch` over your project as you work and point your vhost to `/build` to see the changes.

## License

Copyright (c) 2013 Daniel Kanze (MIT)
