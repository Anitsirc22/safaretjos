//Create map
var map = L.map("map_cris",{zoomControl:false});
var column = document.getElementsByClassName('column')[0];//Use Js to get an HTML object
var label = document.getElementsByClassName('label')[0]; //Use Js to get an HTML object
var layers = column.getElementsByClassName('layers')[0];//Use Js to get an HTML object
/*var graphicContainer = column.getElementsByClassName('q-container')[0];*///Use Js to get an HTML object
var graphicContainer=column.getElementsByClassName('graphic_image')[0];
var filtersContainer = column.getElementsByClassName('filters')[0];
var lngButtons = document.getElementsByClassName('lng-btn');
var contentTitle = document.getElementsByClassName('content_title')[0];
var contentDescription = document.getElementsByClassName('content_description')[0];

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


var babel = {
  "ca": ca,
  "es": es,
  "en": en
};

for (let btn of lngButtons ) {
  if ( btn.addEventListener ) {
    btn.addEventListener('click', function( ev ) {
      var targetLng = ev.currentTarget.getAttribute('id');
      location.hash = targetLng;
      // location.reload();
      currentLng = babel[location.hash.slice(1)];
      updateHTMLTextValues();
      for (let button of lngButtons){
        button.classList.remove("selected");
      }
      ev.currentTarget.classList.add("selected");
    });
  }
};

var currentLng;
if (location.hash == '' ) {
  location.hash = 'en'; //The page starts in catalan
  currentLng = babel[location.hash.slice(1)]; // li trrec el #
} else {
  currentLng = babel[location.hash.slice(1)];
};

for(let button of lngButtons){
  if ( button.getAttribute("id") === location.hash.slice(1)){
    button.classList.add("selected");

  }
}

function lng( val ) {
  if ( val && currentLng[ val ]) {
    return currentLng[ val ]; 
  } else {
    return "";
  }
};

function updateHTMLTextValues(){
  var literals =document.getElementsByClassName('lng');
  for ( let literal of literals ) {
    if ( literal.classList.contains('lng-html') ) {
      literal.innerHTML = lng( literal.getAttribute('lng_val') );  
    } else {
      literal.innerText = lng( literal.getAttribute('lng_val') );
    }
  }

  var imageURL = graphicContainer.style.backgroundImage;
  graphicContainer.style.backgroundImage = imageURL.replace(/(_ca|_es|_en)/,'_'+location.hash.slice(1));
}

updateHTMLTextValues();