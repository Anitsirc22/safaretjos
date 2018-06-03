var paths_layer;

function pathsLayerGen( ) {
  var layer =  new L.geoJson(paths,{
    filter: filterFn,
    style: stylePaths,
    onEachFeature: onEachFeaturePaths
  });
  paths_layer = layer;
  return layer;
}

var blurredDelay;
function highlightFeaturePaths( event ) {
  var mean_transport = "<span class=label3>Mean of transport: </span>"+event.target.feature.properties.Transport;
  label.style.fontSize="30px";
  label.innerHTML = mean_transport;
  var layer = event.target;
  layer.setStyle({
      weight: 10,
      color: '#04FFFF',
      fillOpacity: 1,
      opacity: 1,
  });
  //info.update(layer.feature.properties);
  clearTimeout(blurredDelay);
};




function resetHighlightPaths( e ) {
  paths_layer.resetStyle( e.target );
  clearTimeout(blurredDelay);//si li passo una funcio amb delay la para i no sexecuta

  blurredDelay = setTimeout(function(){//setTimeout executa una funcio en un temps
    label.innerHTML = '';
  }, 600 );
    //info.update();
};

function zoomToFeature( e ) {
  map.fitBounds(e.target.getBounds());
};

function onEachFeaturePaths( feature_A, layer_B ) {
  layer_B.bindPopup("<span>On my way </span>" + feature_A.properties.Reason+"<span>.</span>")
  layer_B.on({
      mouseover: highlightFeaturePaths,
      mouseout: resetHighlightPaths,
      click: zoomToFeature
  });
};

function stylePaths(feature) {
  return {
    
    color: 'white',
    weight: 10,
    opacity: 0.25,
    fillOpacity: 0.5,
    clickable: true
  };
}

//paths_layer = pathsLayerGen();