var layer_identitat_points_heat;
//var _identity_layer;

function geoJson2heat(geojson, weight) {
  return geojson.features.map(function(feature) {
    return [
      feature.geometry.coordinates[1],
      feature.geometry.coordinates[0],
      feature.properties[weight]
    ];
  });
}

function identityLayerGen( ) {

  var data = JSON.parse(JSON.stringify( punts_per_identitats2 )); //copia json
  if ( filterFn ) {
    var filteredFeatures = [];
    for (let feature of punts_per_identitats2.features ) {
      if ( filterFn( feature )){
        filteredFeatures.push( feature );
      }
    }
    data.features = filteredFeatures;
  }

  var punts_per_identitat_heat = geoJson2heat( data, 'neighborhood_identity' );

  var layer = new L.heatLayer(punts_per_identitat_heat, {
    radius: 25,
    max: 10,
    minOpacity: 0.8,
    gradient: {
      0: '#b30000',
      0.60: '#e34a33',
      0.80:'#fc8d59',
      0.85: '#fdcc8a',
      1: '#fef0d9'
    },
    blur:35
  });
  layer_identitat_points_heat = layer;
  /*layer.on('click',function(e){ //NO FUNCIONA
    popUp.setLatLng(e.latlng);
    popUp.setContent(e.layer.feature.properties.Age);
    popUp.openOn(map);
  });*/
  return [ layer, _identityLayerGen() ];
}


function identityPointToLayer( feature, latlng ) {
  return L.circleMarker( latlng, styleIdentity( feature ) );
}

function styleIdentity(feature) {
  
    return {
      radius: 5,
      fillColor: '#fff0',
      color: '#fff0',
      weight: 0.5,
      opacity: 1,
      fillOpacity: 0,
      
    };
  
}

var blurredDelay;
function highlightFeatureIdentity( event ) {
  var identity_label = event.target.feature.properties.Safaretjos_description? event.target.feature.properties.Safaretjos_description : "";
  label.style.fontSize="23px";
  label.innerHTML = "<span class='label3 lng' lng_val='Identity:'>"+lng('Identity:')+"</span>"+event.target.feature.properties.neighborhood_identity+"<br>"+"<span class='label3 lng' lng_val='Safaretjos is ...'>"+lng("Safaretjos is ...")+" </span>"+lng(identity_label);
  var layer = event.target;
  //info.update(layer.feature.properties);
  clearTimeout(blurredDelay);
};




function resetHighlightIdentity( e ) {
  
  clearTimeout(blurredDelay);//si li passo una funcio amb delay la para i no sexecuta

  blurredDelay = setTimeout(function(){//setTimeout executa una funcio en un temps
    label.innerHTML = '';
  }, 600 );
    //info.update();
};



function onEachFeatureIdentity( feature_A, layer_B ) {
  
  layer_B.on({
      mouseover: highlightFeatureIdentity,
      mouseout: resetHighlightIdentity,
    
  });
};

function _identityLayerGen( ){
  // layer_identitat_points_heat = identityLayerGen();
  layer = L.geoJson(punts_per_identitats2,{
    onEachFeature: onEachFeatureIdentity,
    pointToLayer: identityPointToLayer,
    filter: filterFn
  });//PER EL ZOOM FITBOUNDS.

  return layer;
}


