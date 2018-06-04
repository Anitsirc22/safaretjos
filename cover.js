//CREATE COVER MAP
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

//STYLE FUNCTIONS

//PERCEPTIONS

var shape = new L.PatternCircle({ x: 5, y: 5, radius: 1, fill: true, color:'white', fillOpacity:0.2 });
/*shape.addTo(map);*/
var perceptionsPattern = new L.Pattern({width:8, height:8});
perceptionsPattern.addShape(shape);
perceptionsPattern.addTo(map);

/*var stripes2 = new L.StripePattern({
      color:'red',
      angle:45,
      weight:0.6,
      spaceWeight:0.1,

    });*/
var stripes = new L.StripePattern({
      color:'#FFFF00',
      angle:45,
      weight:2,
      spaceWeight:0.2,
      spaceColor:'red',


    });
stripes.addTo(map);

function stylePerceptions(feature) {
    if ( feature.geometry.type === "LineString" &&feature.properties.Perception==="Lost connection") {
    	return {
      	radius: 5,
      		fillColor: '#ff0000',
  			color: '#fff',
  			weight: 3,
  			opacity: 1,
  			fillOpacity: 0,
        	dashArray:"5, 10" 
      };
    } else if ( feature.geometry.type === "LineString" &&feature.properties.Reason==="Mass of vehicles in and out of Barcelona"||feature.properties.Reason==='Transit in the main road') {
    	return {
      	radius: 5,
      		fillColor: '#ff0000',
  			color: '#fec44f',
  			weight: 0.8,
  			opacity: 1,
  			fillOpacity: 0,
        	/*dashArray:"5, 10" */
      };
    } else if (feature.properties.Perception==="Darkness"){
  		return{
  			fillColor:'red',
  			color:'#fff0',
        	fillPattern: perceptionsPattern,
        	fillOpacity:0.5,
      };
    } else if (feature.properties.Reason==="Social borders"){
  		return{
  			fillColor:'#ff6600',
  			color:'#fff0',
        	fillPattern: stripes,
        	fillOpacity:1,
      };
    } else if (feature.properties.Reason==="Changing directions"){
  		return{
  			color:'#04FFFF',
        	opacity:1,
        	weight:2,
        	/*fillColor:'#04FFFF'*/
      };
    
  	} else {
    	return {
    		color: 'white',
    		weight: 1.5,
    		opacity: 1,
    		clickable: true,
        	fillPattern: stripes,

      };
    }
}

//IDENTITY

function geoJson2heat(geojson, weight) {
  return geojson.features.map(function(feature) {
    return [
      feature.geometry.coordinates[1],
      feature.geometry.coordinates[0],
      feature.properties[weight]
    ];
  });
}

//POTENTIAL-CEILING
var shapeCeiling = new L.PatternCircle({ x: 5, y: 5, radius: 1, fill: true, color:'white', fillOpacity:0.2 });
var patternCeiling = new L.Pattern({width:8, height:8});
patternCeiling.addShape(shapeCeiling);
patternCeiling.addTo(map);

/*var stripesCeiling = new L.StripePattern({
  color:'white',
  angle:45,
  weight:0.6,
  spaceWeight:0.1,

});
stripesCeiling.addTo(map);*/

function color(d) {
  return  d == 0 ?  'white' : d > 0 ? '#04FFFF':  'white'; 
};

function weight(d) {
  return  d > 0 ?  1.5 : 0.9; 
};

function styleCadastre(feature) {
  return {
    /*fillColor: fillColor(feature.properties.NPL_flotants),*/
    color: color(feature.properties.NPL_flotants),
    weight: weight(feature.properties.NPL_flotants),
    fillOpacity:0,
    /*opacity: 1,
    fillOpacity: 1,*/
  };
}

//SOCIAL-NETWORKS
function socialPointToLayer( feature, latlng ) {
  return L.circleMarker( latlng, styleSocial( feature ) );
}

function styleSocial(feature) {
  if ( feature.geometry.type === "Point" ) {
    return {
      radius: 5,
      fillColor: '#ff0000',
      color: '#fff',
      weight: 1.5,
      opacity: 1,
      fillOpacity: 0
    };
  } else {
    return {
      color: 'white',
      weight: 0.5,
      opacity: 0.9,
      fillOpacity: 0,
      clickable: true
    };
  }
}

//MUNICIPIS
function styleMunicipis(feature) {
	if ( feature.properties.Municipi === "Badalona" ) {
    return {
      
      color: '#fff0',
      weight: 1.5,
      opacity: 1,
      fillOpacity: 0
    };
  } else {
    return {
    color: 'red',
    weight: 2,
    opacity: 1,
    fillOpacity: 0,
    dashArray:"3, 10" 
  };
  }
};

//ADD LAYERS
var municipalities = new L.geoJson(municipis,{
	style:styleMunicipis,
}).addTo(map_cover);

var pot_ceiling= new L.geoJson( potential_ceiling ,{
	style: styleCadastre,
    /*fillPattern:patternCeiling,*/
	}).addTo(map_cover);
/*currentLayers.push(pot_ceiling);*/

var social_networks = new L.geoJson(social_relationships, {
	style:styleSocial,
	pointToLayer: socialPointToLayer
	
		}).addTo(map_cover); 

var perceptions_layer = new L.geoJson(perceptions,{
	style:stylePerceptions,
}).addTo(map_cover);

var punts_per_identitat_heat = geoJson2heat( punts_per_identitats2, 'neighborhood_identity' );
var identity_layer = new L.heatLayer(punts_per_identitat_heat, { 
	radius: 20,
	max: 10,
	minOpacity: 0.01,
	gradient: {
  		0: '#feb24c',
  		0.60: '#fd8d3c',
  		0.80:'#fc4e2a',
  		0.85: '#e31a1c',
  		1: '#b10026'
	 	},
	blur:35
		}).addTo(map_cover);