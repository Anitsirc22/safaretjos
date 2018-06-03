
var potential_ceiling_layer;

/*function stripes(feature){
  var prova=feature.properties.NPL_flotants
  if (prova>1){
    var stripes2 = new L.StripePattern({
      color:'red',
      angle:45,
      weight:0.6,
      spaceWeight:0.1,

    });
    stripes2.addTo(map);
    }

}
*/

var shape = new L.PatternCircle({ x: 5, y: 5, radius: 1, fill: true, color:'white', fillOpacity:0.2 });
var pattern = new L.Pattern({width:8, height:8});
pattern.addShape(shape);
pattern.addTo(map);

  

function cadastreLayerGen( ) {
  var layer = new L.geoJson( potential_ceiling ,{
    filter: filterFn,
    style: styleCadastre,
    onEachFeature: onEachFeature,
    fillPattern:pattern,
    /*fillPattern:stripes2,*/
    /*fillPattern: stripes,*/
    pane: 'overlayLayers'
  });
  potential_ceiling_layer = layer;
  return layer;
}



// INTERACTION
var blurredDelay;
function highlightFeature(event){
  var layer = event.target;
  var each=event.target.feature.properties.NPL_flotants
  var npl = event.target.feature.properties.NPL_flotants+"<span class='label2 lng' lng_val='FLOORS'>" +lng("FLOORS")+"</span>";
  label.style.fontSize="55px";
  label.innerHTML = npl;//label es el class que he decidit posar al num que es va actualitzant
  if (each>0){
    layer.setStyle({
      weight: 4,
      color: '#04FFFF',
      dashArray: '',
      /*fillOpacity: 1*/
    });
  } else{
    layer.setStyle({
      weight: 4,
      color: 'white',
      dashArray: '',
      /*fillOpacity: 1*/
    });
  }
  

  clearTimeout(blurredDelay);
  //info.update(layer.feature.properties);
}

function resetHighlight(e) {
    potential_ceiling_layer.resetStyle(e.target);
    
    clearTimeout(blurredDelay);//si li passo una funcio amb delay la para i no sexecuta

    blurredDelay = setTimeout(function(){//setTimeout executa una funcio en un temps
      label.innerHTML = '';
    }, 100 );
    //info.update();
};

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
};

function onEachFeature(feature_A,layer_B){
  layer_B.bindPopup("<h1 class='popup-content lng' lng_val='Built floors'>" +lng("Built floors")+ "<span class='popup-content2' >"+feature_A.properties.PL_reals+"</span></h1>"+ "<h1 class='popup-content lng' lng_val='Planned floors'>"+lng('Planned floors')+"<span class=popup-content2>"+feature_A.properties.PL_Planej+"</span></h1>")
  layer_B.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
  });
};

// STYLE

var stripes2 = new L.StripePattern({
  color:'white',
  angle:45,
  weight:0.6,
  spaceWeight:0.1,

});
stripes2.addTo(map);

/*function fillColor(d) {
  return  d < 0 ?  'red' : 
      d == 0 ?  '#00000055' : 
      d == 1 ?  '#80ff80' : 
      d == 2 ?  '#33ff33' : 
      d == 3 ?  '#00e600' : 
      d == 4 ?   '#00b300' : 
      d == 5 ?   '#009900' :
      d == 6 ?   '#008000' :
      d == 7 ?   '#006600' :
      d == 30 ?   '#004d00' : '#80ff80'; 
};
*/
function color(d) {
  return  d == 0 ?  'white' : d > 0 ? '#04FFFF': '#00000055'; 
};

function weight(d) {
  return  d >= 0 ?  1 : 0.5; 
};

function styleCadastre(feature) {
  return {
    /*fillColor: fillColor(feature.properties.NPL_flotants),*/
    color: color(feature.properties.NPL_flotants),
    weight: weight(feature.properties.NPL_flotants),
    /*opacity: 1,
    fillOpacity: 1,*/
    clickable: true
  };
}

// var currentFilterCriteria = {
//   home: true,
//   dona: true,
//   "0-15": true,
//   "16-25": true,
//   "26-40": true
// };

// potential_ceiling_layer = cadastreLayerGen();
// var currentLayer = potential_ceiling_layer;
// currentLayer.addTo(map);
// map.fitBounds(currentLayer.getBounds());