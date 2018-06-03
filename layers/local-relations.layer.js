var local_relationships_layer;
var canvasRenderer;

function style_flows_local(geoJsonFeature) {
  // use leaflet's path styling options

  // since the GeoJSON feature properties are modified by the layer,
  // developers can rely on the "isOrigin" property to set different
  // symbols for origin vs destination CircleMarker stylings

  if (geoJsonFeature.properties.isOrigin) {
    return {
      renderer: canvasRenderer, // recommended to use your own L.canvas()
      radius: 3,
      weight: 1,
      color: '#04FFFF',
      fillColor: 'rgba(0, 0, 0, 1)',
      fillOpacity: 1
    };
  } else {
    return {
      renderer: canvasRenderer,
      radius: 7.5,
      weight: 1,
      color: 'rgb(255, 255, 255)',
      fillColor: 'rgb(255, 255, 255)',
      fillOpacity: 0.25
    };
  }
}


function localRelationsLayerGen( ) {

  canvasRenderer = L.canvas();

  var data = JSON.parse(JSON.stringify(local_relationships));
  var filteredFeatures = [];
  for (let feature of local_relationships.features) {
    if ( filterFn( feature )) {
      filteredFeatures.push( feature );
    }
  }
  data.features = filteredFeatures;

  var layer = new L.canvasFlowmapLayer(data, {
    style:style_flows_local,
    // required property for this custom layer,
    // which relies on the property names of your own data
    originAndDestinationFieldIds: {
      originUniqueIdField: 'id_start',
      originGeometry: {
        x: 'x_start',
        y: 'y_start'
      },
      destinationUniqueIdField: 'id_end',
      destinationGeometry: {
        x: 'x_end',
        y: 'y_end'
      },
    },
  
    // some custom options
    pathDisplayMode: 'all',
    animationStarted: true,
    animationEasingFamily: 'Cubic',
    animationEasingType: 'In',
    animationDuration: 2000
  }).addTo(map);

  var popUp= L.popup();

  var selection = {};
  layer.on('click', function(e) {
    if ( selection.lng === e.latlng.lng && selection.lat === e.latlng.lat ) {
      layer.selectFeaturesForPathDisplay( data.features, 'SELECTION_NEW' );
      selection = {};
      return;
    } else {
      selection = e.latlng;
    }

    if (e.sharedOriginFeatures.length) {
      layer.selectFeaturesForPathDisplay(e.sharedOriginFeatures, 'SELECTION_NEW');
      map.fitBounds(e.target.getBounds());
    }
    if (e.sharedDestinationFeatures.length) {
      layer.selectFeaturesForPathDisplay(e.sharedDestinationFeatures, 'SELECTION_NEW');
      map.fitBounds(e.target.getBounds());
    }
    if (!e.isOriginFeature){
      popUp.setLatLng(e.latlng);
      popUp.setContent(e.layer.feature.properties.Facility);
      popUp.openOn(map);
    }
  });
  local_relationships_layer = layer;
  return layer;

}

// exampleFlowmapLayer = metroRelationsGen();
// exampleFlowmapLayer.addTo(map);