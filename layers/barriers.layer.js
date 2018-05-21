var barriers_layer ;

function barriersLayerGen() {
  var layer = new L.geoJson(barriers,{
    filter: filterFn,
    style:styleBarriers,
    onEachFeature:onEachFeatureBarriers
    
  });

  barriers_layer = layer;
  return layer;
}

function styleBarriers(feature) {
  return {
    color: 'black',
    fillColor: 'white',
    weight: 1,
    opacity: 0,
    fillOpacity: 0.2,
    clickable: true
  };
}

function highlightFeatureBarriers(event){
  var layer = event.target;
  layer.setStyle({
      weight: 3,
      fillColor: '#04FFFF',
      color: 'black',
      fillOpacity: 1,
      opacity: 0,
  });
  //info.update(layer.feature.properties);
}

function resetHighlightBarriers(e) {
    barriers_layer.resetStyle(e.target);
    //info.update();
};

function onEachFeatureBarriers(feature_A,layer_B){
  layer_B.bindPopup(feature_A.properties.Barrier)
  layer_B.on({
      mouseover: highlightFeatureBarriers,
      mouseout: resetHighlightBarriers,
      click: zoomToFeature
  });
}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}