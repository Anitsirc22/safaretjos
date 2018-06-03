var perceptions_layer;

function perceptionsLayerGen( ) {
  var layer =  new L.geoJson(perceptions,{
    filter:filterFn,
    style: stylePerceptions,
    onEachFeature:onEachFeaturePerceptions,
    /*fillPattern:perceptionsPattern  */  
    
  });
  perceptions_layer = layer;
  return layer;
}

//perceptions_layer = perceptionsLayerGen();


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
      color:'red',
      angle:45,
      weight:0.6,
      spaceWeight:0.1,

    });
stripes.addTo(map);
/*console.log( perceptionsPattern );*/

/*var perceptionsPattern = function( a,b,c ) {
  console.log( a,b,c );
}
*/
/*function patternPerceptions(feature){
  console.log( feature );
  var prova=feature.properties.Perception
  if (prova==="Vulnerable spaces"){
    var stripes2 = new L.StripePattern({
      color:'red',
      angle:45,
      weight:0.6,
      spaceWeight:0.1,

    });
    stripes2.addTo(map);
    return stripes2
    }

}*/


function stylePerceptions(feature) {
    if ( feature.geometry.type === "LineString" &&feature.properties.Perception==="Lost connection") {
    	return {
      	radius: 5,
      	fillColor: '#ff0000',
  			color: '#fff',
  			weight: 0.5,
  			opacity: 1,
  			fillOpacity: 0,
        dashArray:"5, 10" 
      };
    } else if (feature.properties.Reason==="Architecture as an obstacle"){
  		return{
  			fillColor:'red',
  			color:'#fff0',
        fillPattern: perceptionsPattern
      };
  	} else {
    	return {
    		color: 'white',
    		weight: 0.5,
    		opacity: 0.5,
    		clickable: true,
        fillPattern: stripes
      };
    }
}


var blurredDelay;
function highlightFeaturePerceptions( event ) {
  var perception_label = event.target.feature.properties.Reason;
  label.style.fontSize="23px";
  label.innerHTML = perception_label;
  var layer = event.target;
  layer.setStyle({
      weight: 4,
      color: 'white',
      fillOpacity: 0,
      opacity: 1,
  });
  //info.update(layer.feature.properties);
  clearTimeout(blurredDelay);
};




function resetHighlightPerceptions( e ) {
  perceptions_layer.resetStyle( e.target );
  clearTimeout(blurredDelay);//si li passo una funcio amb delay la para i no sexecuta

  blurredDelay = setTimeout(function(){//setTimeout executa una funcio en un temps
    label.innerHTML = '';
  }, 100 );
    //info.update();
};

function zoomToFeature( e ) {
  map.fitBounds(e.target.getBounds());
};

function onEachFeaturePerceptions( feature_A, layer_B ) {
  
  layer_B.on({
      mouseover: highlightFeaturePerceptions,
      mouseout: resetHighlightPerceptions,
      click: zoomToFeature
  });
};

