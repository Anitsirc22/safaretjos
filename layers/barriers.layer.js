var barriers_layer ;

/*var shape = new L.PatternCircle({ x: 5, y: 5, radius: 1, fill: true, color:'white', fillOpacity:0.2 });
var pattern = new L.Pattern({width:8, height:8});
pattern.addShape(shape);
pattern.addTo(map);*/

function barriersLayerGen() {
  var layer = new L.geoJson(barriers,{
    filter: filterFn,
    style:styleBarriers,
    onEachFeature:onEachFeatureBarriers,
    /*fillPattern:pattern,*/
    
  });a

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

var blurredDelay;
function highlightFeatureBarriers(event){
  var type_barrier =event.target.feature.properties.Barrier.split(" ")[0]+"<span class=label3> border</span>";
  label.style.fontSize="30px";
  label.innerHTML = type_barrier;
  var layer = event.target;
  layer.setStyle({
      weight: 3,
      fillColor: '#04FFFF',
      color: 'black',
      fillOpacity: 1,
      opacity: 0,
  });
  //info.update(layer.feature.properties);
  clearTimeout(blurredDelay);
}

function resetHighlightBarriers(e) {
  barriers_layer.resetStyle(e.target);
    //info.update();
  clearTimeout(blurredDelay);//si li passo una funcio amb delay la para i no sexecuta

  blurredDelay = setTimeout(function(){//setTimeout executa una funcio en un temps
    label.innerHTML = '';
  }, 100 );
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