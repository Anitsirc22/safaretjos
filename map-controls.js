var myLayers = [
  {
    name: "Potential ceiling",
    layer: "",
    // graphic: "graphic_1",
    url: "http://www.quadrigram.com/hosting/taller_tematic/sostre_potencial2/",
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
    url: "http://www.quadrigram.com/hosting/taller_tematic/identitats/",
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
    name:"Perceptions of borders",
    layer: barriers_layer,
    // graphic: "graphic_3",
    url: "http://www.quadrigram.com/hosting/taller_tematic/fronteres/",
    filters: ['Male','Female','0-15 years old','16-40 years old','+ than 40 years old'],
    filterCriteria: {
      Male: true,
      Female: true,
      '0-15 years old': true,
      "16-40 years old": true,
      "+ than 40 years old": true
    },
    // data: punts_per_identitats2,
    layerGen: barriersLayerGen
  },
  {
    name: "Social networks",
    layer: social_relationships_layer,
    // graphic: "graphic_4",
    url: "http://www.quadrigram.com/hosting/taller_tematic/xarxes_socials/",
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
    url: "http://www.quadrigram.com/hosting/taller_tematic/relcions_locals/",
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
    url: "http://www.quadrigram.com/hosting/taller_tematic/recorreguts/",
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
    url: "http://www.quadrigram.com/hosting/taller_tematic/relacions_metropolitanes/",
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
  htmlEl.setAttribute('class','layers-list-item');
  htmlEl.innerText = enterLayer.name; // lng( enterLayer.name);

  layers.appendChild(htmlEl);

  // binding events
  
  htmlEl.addEventListener('click', function(){
    // for (let exitLayer of myLayers){
    //   map.removeLayer(exitLayer.layer);
    // }
    if ( currentLayer ) {
      map.removeLayer( currentLayer );
    }

    //update map
    //map.addLayer(enterLayer.layer);
    enterLayer.layer = enterLayer.layerGen();
    if ( enterLayer.name != "Relacions metropolitanes" && enterLayer.name != "Relacions locals" ) {
      enterLayer.layer.addTo(map);
    }

    currentLayer = enterLayer.layer;
    currentFilterCriteria = enterLayer.filterCriteria;

    if ( enterLayer.name != 'Identity' ) {
      map.fitBounds(currentLayer.getBounds());
    } else {
      map.fitBounds(_identity_layer.getBounds());
    }
      

    // quadrigram graphs update
    graphicContainer.getElementsByTagName('iframe')[0].setAttribute('src', enterLayer.url);

    // filters update
    var filtersHTMLString = '';
    for (let filter of enterLayer.filters ) {
      filtersHTMLString += '<div class="option-wrapper"><div class="option-btn" >'+ filter + '</div></div>';
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

  if ( currentLayer  ) {
    map.removeLayer( currentLayer );
  }

  enterLayer.layer  = enterLayer.layerGen( );
  currentLayer = enterLayer.layer;

  if ( enterLayer.name != "Relacions metropolitanes" && enterLayer.name !="Relacions locals") {
    currentLayer.addTo(map);
  }
  
  if ( enterLayer.name != 'Identity' ) {
    map.fitBounds(currentLayer.getBounds());
  } else {
    map.fitBounds(_identity_layer.getBounds());
  }
}

var filtersHTMLString = '';
for (let filter of myLayers[0].filters ) {
  filtersHTMLString += '<div class="option-wrapper"><div class="option-btn" >'+ filter + '</div></div>';
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
var currentLayer = cadastreLayerGen();
currentLayer.addTo(map);
map.fitBounds(currentLayer.getBounds());