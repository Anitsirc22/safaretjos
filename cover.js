var map_cover = L.map("map_cover",{ zoomControl:false, attribution: '' });
map_cover.setView([41.435435, 2.212861],18);
var enter_button=document.getElementsByClassName("home_button")[0];
var exit_button=document.getElementsByClassName("home_button_exit")[0];
var cover=document.getElementsByClassName("home_cover")[0];

enter_button.addEventListener('click',function(e){
	cover.style.opacity=0;
	setTimeout(function(){
		cover.style.display="none";
	},500);
});

exit_button.addEventListener('click',function(e){
	cover.style.display="block";
	setTimeout(function(){cover.style.opacity=1}, 0);
});

var myTileLayer = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
    maxZoom: 19,
    id: 'orzoc.181b5b9d'  
  }).addTo(map_cover);

map_cover.dragging.disable();
map_cover.touchZoom.disable();
map_cover.doubleClickZoom.disable();
map_cover.scrollWheelZoom.disable();


var pot_ceiling= new L.geoJson( potential_ceiling ,{
	
	
		}).addTo(map_cover);
/*currentLayers.push(pot_ceiling);*/

var social_networks = new L.geoJson(social_relationships, {
	
		}).addTo(map_cover);  
/*currentLayers.push(social_networks);*/

var perceptions_layer = new L.geoJson(perceptions).addTo(map_cover);



function geoJson2heat(geojson, weight) {
  return geojson.features.map(function(feature) {
    return [
      feature.geometry.coordinates[1],
      feature.geometry.coordinates[0],
      feature.properties[weight]
    ];
  });
}
var punts_per_identitat_heat = geoJson2heat( punts_per_identitats2, 'neighborhood_identity' );
var identity_layer = new L.heatLayer(punts_per_identitat_heat, { //NO S'AFEGEIX
	radius: 25,
	max: 10,
	minOpacity: 0.05,
	gradient: {
  		0: '#d7191c',
  		0.60: '#fdae61',
  		0.80:'#ffffbf',
  		0.85: '#BE788D',
  		1: '#F90527'
	 	},
	blur:35
		}).addTo(map_cover);


