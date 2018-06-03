var myLayers = [
  {
    name: "Potential ceiling",
    layer: "",
    // graphic: "graphic_1", //<div class='q-container' style='max-width:900px; margin:auto; position:relative'> <div style='padding-bottom:41.7%; position:relative'> <iframe src=http://www.quadrigram.com/hosting/taller_tematic/sostre_potencial2/ width='100%' height='100%' style='border: none; position:absolute'></iframe></div><div style='text-align:right; font-size: 10px'><a href='http://www.quadrigram.com' target='_blank'>Powered by Quadrigram </a></div> </div>
    // url: "http://www.quadrigram.com/hosting/taller_tematic/sostre_potencial2/",
    image:'potential_ceiling.jpg',
    filters: ["High potential","Medium potential","Low potential", "Depleted potential","Exceeded potential"],
    filterCriteria: {
      "High potential": true,
      "Medium potential":true,
      "Low potential": true,
      "Depleted potential": true,
      "Exceeded potential": true
      

    },
    // data: parceles_edat_sexe,//data
    // onEachFeature: onEachFeature,
    // style: styleCadastre,
    layerGen: cadastreLayerGen
  },
  {
    name: "Identity",
    layer: layer_identitat_points_heat,
    // graphic: "graphic_2",
    // url: "http://www.quadrigram.com/hosting/taller_tematic/identitats/",
    image:'identity.jpg',
    filters: ['Male','Female','0-15 years old','16-40 years old','+ than 40 years old'],
    filterCriteria: {
      Male: true,
      Female: true,
      '0-15 years old': true,
      "16-40 years old": true,
      "+ than 40 years old": true
    },
    // data: punts_per_identitats2,
    layerGen: identityLayerGen
  },
  {
    name:"Perceptions",
    layer: perceptions_layer,
    // graphic: "graphic_3",
    // url: "http://www.quadrigram.com/hosting/taller_tematic/fronteres/",
    image:'barriers.jpg',
    filters: ['Darkness','Vulnerable spaces','Physical border','Lost connection','Noise'],
    filterCriteria: {
      Darkness: true,
      "Vulnerable spaces": true,
      "Physical border": true,
      "Lost connection": true,
      Noise: true
    },
    layerGen: perceptionsLayerGen
  },
  {
    name: "Social networks",
    layer: social_relationships_layer,
    // graphic: "graphic_4",
    //url: "http://www.quadrigram.com/hosting/taller_tematic/xarxes_socials/",
    image:'social_relations.jpg',
    filters: ['Male','Female','0-15 years old','16-40 years old','+ than 40 years old'],
    filterCriteria: {
      Male: true,
      Female: true,
      '0-15 years old': true,
      "16-40 years old": true,
      "+ than 40 years old": true
    },
    // data: social_relationships,
    // onEachFeature: onEachFeature,
    // style: null,
    layerGen: socialNetworkLayerGen    
  },
  {
    name: "Paths",
    layer: paths_layer,
    // graphic: "graphic_5",
    // url: "http://www.quadrigram.com/hosting/taller_tematic/relcions_locals/",
    image:'paths.jpg',
    filters: ['Male','Female','0-15 years old','16-40 years old','+ than 40 years old'],
    filterCriteria: {
      Male: true,
      Female: true,
      '0-15 years old': true,
      "16-40 years old": true,
      "+ than 40 years old": true
    },
    // data: paths,
    // onEachFeature: onEachFeaturePaths,
    // style: stylePaths,
    layerGen: pathsLayerGen
  },
  {
    name: "Local relationships",
    layer: local_relationships_layer,
    // graphic: "graphic_6",
    // url: "http://www.quadrigram.com/hosting/taller_tematic/recorreguts/",
    image:'local_relationships.jpg',
    filters: ['Male','Female','0-15 years old','16-40 years old','+ than 40 years old'],
    filterCriteria: {
      Male: true,
      Female: true,
      '0-15 years old': true,
      "16-40 years old": true,
      "+ than 40 years old": true
    },
    // data: local_relationships,
    // onEachFeature: onEachFeature,
    layerGen: localRelationsLayerGen
  },
  {
    name: "Metropolitan relationships",
    layer: metro_relationships_layer,
    // graphic: "graphic_7" ,
    // url: "http://www.quadrigram.com/hosting/taller_tematic/relacions_metropolitanes/",
    image:'metro_relationships.jpg',
    filters: ['Male','Female','0-15 years old','16-40 years old','+ than 40 years old'],
    filterCriteria: {
      Male: true,
      Female: true,
      '0-15 years old': true,
      "16-40 years old": true,
      "+ than 40 years old": true
    },
    layerGen: metroRelationsGen
  }
];

//control layers
for (let enterLayer of myLayers){
  var htmlEl = document.createElement('div');
  htmlEl.setAttribute('class','layers-list-item lng');
  htmlEl.setAttribute('lng_val', enterLayer.name );
  htmlEl.innerText = lng( enterLayer.name );

  layers.appendChild(htmlEl);

  // binding events
  
  htmlEl.addEventListener('click', function(e){
/*    if (currentLayers){//convertir la var currentLayer a llista 
      for (let currentLayer of currentLayers){
        map.removeLayer( currentLayer );
      }
    }*/
    
    layersNames = layers.getElementsByClassName('layers-list-item');
    for (let layerName of layersNames ) {
      layerName.classList.remove('selected');
    }

    e.currentTarget.classList.add('selected');

    if ( Array.isArray(currentLayer) ) {
      for ( let l of currentLayer ) {
        map.removeLayer( l );
      }
    } else {
      map.removeLayer( currentLayer );
    }

    currentFilterCriteria = JSON.parse(JSON.stringify(enterLayer.filterCriteria));
    enterLayer.layer = enterLayer.layerGen();
    currentLayer = enterLayer.layer;

    if ( Array.isArray( currentLayer )) {
      for ( let l of currentLayer ) {
        map.addLayer( l );
      }
    } else if ( enterLayer.name != "Relacions metropolitanes" && enterLayer.name != "Relacions locals" ) {
      enterLayer.layer.addTo(map);
    } else {
      map.addLayer( currentLayer );
    }

    if ( enterLayer.name != 'Identity' ) {
      map.fitBounds(currentLayer.getBounds());
    } else {
      map.fitBounds(currentLayer[1].getBounds());
    }
      

    // quadrigram graphs update
    /*graphicContainer.getElementsByTagName('iframe')[0].setAttribute('src', enterLayer.url);*/
/*    if (location.hash === '' ) {
      location.hash = 'en';
    }*/

    var imageURL = 'url(fotos/'+enterLayer.image.split('.')[0]+'_'+location.hash.slice(1)+'.'+enterLayer.image.split('.')[1] + ')';
    graphicContainer.style.backgroundImage=imageURL;//enterLayer.image;//NO FUNCIONA

    // filters update
    var filtersHTMLString = '';
    for (let filter of enterLayer.filters ) {
      filtersHTMLString += '<div class="option-wrapper"><div class="option-btn lng" lng_val="'+filter+'">' + lng( filter ) + '</div></div>';
    }  // lng( filter );

    filtersContainer.innerHTML = filtersHTMLString;

    var buttons = filtersContainer.getElementsByClassName('option-btn');

    for ( let index in buttons ) {
      btn = buttons[index];
      if ( btn.addEventListener ) {
        btn.addEventListener('click', function(e) {
          onFilterButtonClick( e, enterLayer.filters[index], enterLayer );
        });
      }
    }
  });
}

function onFilterButtonClick( e, filterValue, enterLayer ) {
  var button = e.currentTarget;
  button.classList.toggle('selected');// toggle removes the class "selected" if it has it or adds it if i doesn't have it
  currentFilterCriteria[filterValue] = !currentFilterCriteria[filterValue]; //per passar de true a false
  showLayer( enterLayer );
}

function showLayer( enterLayer ){

  if ( currentLayer ) {
    if ( Array.isArray(currentLayer)) {
      for ( let l of currentLayer ) {
        map.removeLayer( l );
      }
    } else {
      map.removeLayer( currentLayer );
    }
  }

  enterLayer.layer  = enterLayer.layerGen( );
  currentLayer = enterLayer.layer;

  if ( enterLayer.name != "Relacions metropolitanes" && enterLayer.name !="Relacions locals") {
    if ( Array.isArray( currentLayer )) {
      for ( let l of currentLayer ) {
        l.addTo( map );
      }
    } else {
      currentLayer.addTo(map);
    }
  }
  
  if ( enterLayer.name != 'Identity' ) {
    map.fitBounds(currentLayer.getBounds());
  } else {
    map.fitBounds(currentLayer[1].getBounds());
  }
}

var filtersHTMLString = '';
for (let filter of myLayers[0].filters ) {
  filtersHTMLString += '<div class="option-wrapper"><div class="option-btn lng" lng_val="'+filter+'" >'+ lng( filter ) + '</div></div>';
} // lng( filter );
filtersContainer.innerHTML = filtersHTMLString;

var buttons = filtersContainer.getElementsByClassName('option-btn');
  for (let index in buttons) {
    btn = buttons[index];
    if ( btn.addEventListener ) {
      btn.addEventListener('click', function(e) {
        onFilterButtonClick( e, myLayers[0].filters[index], myLayers[0] );
      });
  }
}

function filterFn( feature ){
  var isValid = true;
  Object.keys(feature.properties).map( function( k ) {
    if (currentFilterCriteria[feature.properties[k]]!=undefined){
      isValid = isValid && Boolean(currentFilterCriteria[feature.properties[k]]);
    }
  });
  return isValid;
}

var currentFilterCriteria = myLayers[0].filterCriteria;
var currentLayer = cadastreLayerGen();//PROBLEMA ARA SÓN TRES CAPES INICIALS PER TANT CURRENTLAYER HA DE SER LLISTA?¿
/*var currentLayers = homeLayerGen();
for(let currentLayer in currentLayers){
  currentLayer.addTo(map);
}*/


currentLayer.addTo(map);
map.fitBounds(currentLayer.getBounds());
