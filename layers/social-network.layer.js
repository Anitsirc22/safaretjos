var social_relationships_layer;

function socialNetworkLayerGen( filterFn ) {
  var layer = new L.geoJson(social_relationships, {
    filter: filterFn,
    style: styleSocial,
    onEachFeature: onEachFeatureSocial,
    pointToLayer: socialPointToLayer
  });
  social_relationships_layer = layer;
  return layer;
}

// function getOpacity( feature ) {
//   if (featrue.geometry.type == "Point" ){

//   } else {

//   }
// }

function socialPointToLayer( feature, latlng ) {
  return L.circleMarker( latlng, styleSocial( feature ) );
}

function styleSocial(feature) {
  if ( feature.geometry.type === "Point" ) {
    return {
      radius: 5,
      fillColor: '#ff0000',
      color: '#fff',
      weight: 0.5,
      opacity: 1,
      fillOpacity: 0
    };
  } else {
    return {
      color: 'white',
      weight: 0.5,
      opacity: 0.5,
      fillOpacity: 0,
      clickable: true
    };
  }
}

function onEachFeatureSocial( feature, layer ) {

  if ( feature.geometry.type === "Point" ) {
    layer.on({
      mouseover: highlightNetwork,
      mouseout: resetHighlightNetwork
    });
  } else {
    layer.on({

    });
  }
}

function startsFrom( feature, targetFeature ) {
  var pointCords = targetFeature.geometry.coordinates;
  return feature.properties.x_start == targetFeature.properties.x_start//pointCords[1]
    || feature.properties.x_end_2 == targetFeature.properties.x_start//pointCords[1]
    || feature.properties.x_end_1 == targetFeature.properties.x_start//pointCords[1]
    || feature.properties.y_start == targetFeature.properties.y_start//pointCords[0]
    || feature.properties.y_end_1 == targetFeature.properties.y_start//pointCords[0]
    || feature.properties.y_end_2 == targetFeature.properties.y_start//pointCords[0]
    || false;
}

function highlightNetwork( event ) {
  var layer = event.target;

  Object.keys(currentLayer._layers).map( function( key ) {
    var _layer = currentLayer._layers[key];
    if ( _layer.feature.geometry.type != "Point" && startsFrom( _layer.feature, layer.feature ) ) {
      _layer.setStyle({
        weight: 2,
        color: '#04FFFF',
        // fillOpacity: 1,
        opacity: 0.8,
      });      
    }
  });
}

function resetHighlightNetwork( event ) {
  // var layer = event.target;
  // social_relationships_layer.resetStyle( event.target );
  Object.keys(currentLayer._layers).map( function( key ) {
    var _layer = currentLayer._layers[key];
    if ( _layer.feature.geometry && _layer.feature.geometry.type === "LineString" ) {
      _layer.setStyle({
        color: 'white',
        weight: 0.5,
        opacity: 0.5,
        fillOpacity: 0,
        clickable: true
      });
    }
  });
}

// social_relationships_layer = socialNetworkLayerGen(); //.addTo(map);