
/*currentLayers=[];*/

function homeLayerGen(){
	var pot_ceiling= new L.geoJson( potential_ceiling ,{
    	style: styleCadastre,
    	fillPattern:pattern,
    	pane: 'overlayLayers'
  		});/*.addTo(map);*/
	/*currentLayers.push(pot_ceiling);*/

	var social_networks = new L.geoJson(social_relationships, {
    	style: styleSocial,
    	pointToLayer: socialPointToLayer
  		});/*.addTo(map); */ 
	/*currentLayers.push(social_networks);*/

	var barriers_layer = new L.geoJson(barriers,{

    	/*style:styleBarriers,*/ //NO FUNCIONA
  		});/*.addTo(map);
  	/*currentLayers.push(barriers_layer);*/


/*	var identity_layer = new L.heatLayer(punts_per_identitat_heat, { //NO S'AFEGEIX
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
  		}).addTo(map);*/
	/*currentLayers.push(identity_layer);

};




