//Create map
var map = L.map("map_cris");
var column = document.getElementsByClassName('column')[0];//Use Js to get an HTML object
var label = document.getElementsByClassName('label')[0]; //Use Js to get an HTML object
var layers = column.getElementsByClassName('layers')[0];//Use Js to get an HTML object
var graphicContainer = column.getElementsByClassName('q-container')[0];//Use Js to get an HTML object
var filtersContainer = column.getElementsByClassName('filters')[0];
// var lngButtons = column.getElementsByClassName('lng-btn');

map.setView([41.435435, 2.212861],18);

var myTileLayer = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
    maxZoom: 19,
    id: 'orzoc.181b5b9d'  
  }).addTo(map);

L.control.scale({
  metric:true,
  imperial: true,
  maxWidth: 200
}).addTo(map);



function styleMunicipis(feature) {
  return {
    color: 'white',
    weight: 2,
    opacity: 1,
    fillOpacity: 0,
    clickable: true
  };
};


map.createPane('baseLayers');
map.getPane('baseLayers').style.zIndex = 300;
map.getPane('baseLayers').style.pointerEvents = 'none';

map.createPane('overlayLayers');
map.getPane('overlayLayers').style.zIndex = 500;
//QUAN AFEGEIXO LA CAPA MUNICIPIS, EL POPUP DE RELACIONS METROP DEIXA D'ESTAR ACTIU
var municipis_layer = new L.geoJson(municipis,{
  style:styleMunicipis,
  pane: 'baseLayers'
}).addTo(map);


// var babel = {
//   "ca": ca,
//   "es": es,
//   "en": en
// };

// for (let btn of lngButtons ) {
//   if ( btn.addEventListener ) {
//     btn.addEventListener('click', function( ev ) {
//       var targetLng = ev.currentTarget.getAttribute('id');
//       location.hash = targetLng;
//       location.reload();
//     });
//   }
// };

// function lng( val ) {
//   if ( val ) {
//     return currentLng[ val ]; 
//   } else {
//     return "";
//   }
// }

// var currentLng;
// if (location.hash == '' ) {
//   location.hash = 'ca';
//   currentLng = babel[location.hash];
// } else {
//   currentLng = babel[location.hash];
// }