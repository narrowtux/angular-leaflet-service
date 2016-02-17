# angular-leaflet-service

A simple way to use leaflet or mapbox as a directive while not giving up on the flexibility of the leaflet API.

## Setup

This library offers you the choice between 2 providers: `leaflet` (**Default**) and `mapbox`.

If you use `mapbox`, you need to set your access token:

```js
yourmodule.config(function($leafletProvider) {
  $leafletProvider.setup({
    provider: "mapbox",
    accessToken: "pk.xxxxxxx"
  });
});
```



## Usage

Use the `leaflet-map` directive anywhere in your app to put a map there. This library will identify each map via the `id`
attribute on the element you used the directive on.

```html
<leaflet-map id="my-demo-map"></leaflet-map>
```

In your controller, you can obtain your map instance with the `$leaflet` service:

```js
$leaflet.getMap("my-demo-map").then(function(map) {
  L.marker([53.54404, 9.99623]).addTo(map);
});
```

As `$leaflet.getMap` returns a promise, you should refrain from caching the value somewhere to prevent race conditions.

If you use `leaflet`, you should set the tileset for your map there as well.

If you use mapbox, it will use `mapbox.streets` as a default style, you can modify that in the directive:

```html
<leaflet-map id="my-demo-map" mapbox-style="mapbox.pirates"></leaflet-map>
```
