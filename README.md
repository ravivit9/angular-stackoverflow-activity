# Angular StackOverflow Activity [![Build Status](https://travis-ci.org/gigablox/angular-stackoverflow-activity.png)](https://travis-ci.org/gigablox/angular-stackoverflow-activity)

[Homepage](http://gigablox.github.io/angular-stackoverflow-activity/)

An [AngularJS](http://angularjs.org/) directive module for displaying a users public [StackOverflow activity](https://api.stackexchange.com/docs/timeline-on-users).

## Usage

1. `bower install --save angular-stackoverflow-activity`
2. Include [dependencies](#dependencies) in your HTML.
3. Use the `stackoverflow-activity` directive.

## Dependencies

The `stackoverflow.activity` module requires a dependency of `ngResource` for service calls made to the StackOverflow API.

The templates expect `/fonts` which contain iconography so make sure to include those as well. You can [customize templates](#custom-templates) to change the icons or remove them entirely.

```html
<head>
<link href="app.css" /> <!-- Your application css and overrides -->
<link href="stackoverflow-activity.css" /> <!-- Find this in /release -->
</head>

<body>
...
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0-rc.2/angular.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0-rc.2/angular-resource.min.js"></script>
<script src="app.js"></script> <!-- Your angular app -->
<script src="stackoverflow-activity.js"></script> <!-- Find this in /release -->
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
    
    //StackOverflow API support CORS as well. (https://api.stackexchange.com/docs)
    callback:'JSON_CALLBACK', 
    
    //StackOverflow API rate limits to (300 requests per day) for anonymous requests. (https://api.stackexchange.com/docs/throttle)
    //If you need more (10000 requests per day) you can generate a (key) for your app and is safe for client side code. (http://stackapps.com/apps/oauth/register)
    key:'mykey123'
    
    //Required.
    site:'stackoverflow',
    
    //Will return additional event properties like URL's. Required out of the box, but you can always customize templates to your liking to remove this dependency.
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

Custom iconography can be changed by importing the `stackoverflow-activity.json` file found in `/src/assets` into [icomoon.io/app](http://icomoon.io/app). After downloading a new set, make sure to update the cooresponding CSS in `stackoverflow-activity.less` and fonts in `/assets/fonts`.

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
