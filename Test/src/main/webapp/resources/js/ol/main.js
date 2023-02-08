// basic vectorsource
var vectorSource = new ol.source.Vector();
// add seoul wfs feature
var vectorSource2 = new ol.source.Vector({
	format: new ol.format.GeoJSON(),
	url: function () {
		var strUrl = 'http://localhost:8089/geoserver/test_workspace/ows?service=WFS&' + 
		'version=1.0.0&request=GetFeature&typeName=test_workspace%3Asample_cntofstore_in_seoul&' + 
		'maxFeatures=50&outputFormat=application%2Fjson&srsname=EPSG:3857';
		
		return strUrl;
	},
});
// add centroid wfs feature
var vectorSource3 = new ol.source.Vector({
	format: new ol.format.GeoJSON(),
	url: function () {
		var strUrl = 'http://localhost:8089/geoserver/test_workspace/ows?service=WFS&' +
		'version=1.0.0&request=GetFeature&typeName=test_workspace%3Acenter&' +
		'maxFeatures=50&outputFormat=application%2Fjson&srsname=EPSG:3857&' +
		'bbox=14067432.467089696,4459374.448671326,14228179.537573421,4548117.838510415,EPSG:3857';
		
		return strUrl;
	},
	strategy: ol.loadingstrategy.bbox
});
// add siheung wfs feature
var AX, AY, BX, BY;
var vectorSource4 = new ol.source.Vector({
	format: new ol.format.GeoJSON(),
	url: function () {
		var strUrl = 'http://localhost:8089/geoserver/test_workspace/ows?service=WFS&' +
		'version=1.0.0&request=GetFeature&typeName=test_workspace%3Ash&' + 
		'maxFeatures=50&outputFormat=application%2Fjson&srsname=EPSG:3857&' +
		'bbox=14067432.467089696,4459374.448671326,14228179.537573421,4548117.838510415,EPSG:3857';
		
		AX = vectorSource4.V.arguments[0][0];
		AY = vectorSource4.V.arguments[0][1];
		BX = vectorSource4.V.arguments[0][2];
		BY = vectorSource4.V.arguments[0][3];
		
		return strUrl;
	},
	strategy: ol.loadingstrategy.bbox
});



// variable settings for initial load
var vector = new ol.layer.Vector({		//vector settings for object selection
	source: vectorSource,
	style: new ol.style.Style({
		fill: new ol.style.Fill({
			color: 'rgba(105, 156, 11, 1)'
		}),
		stroke: new ol.style.Stroke({
			color: '#699c0b',
			width: 2
		}),
		image: new ol.style.Circle({
			radius: 7,
			fill: new ol.style.Fill({
				color: '#699c0b'
			})
		})
	})
});
var vector2 = new ol.layer.Vector({		//vector settings for object selection
  source: vectorSource2,
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new ol.style.Stroke({
      color: '#de1907',
      width: 2
    }),
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({
        color: '#de1907'
      })
    })
  })
});
var vector3 = new ol.layer.Vector({		//vector settings for object selection
	source: vectorSource3,
	minResolution: 5,
    maxResolution: 70,
	style: new ol.style.Style({
		fill: new ol.style.Fill({
			color: 'rgba(255, 255, 255, 0.2)'
		}),
		stroke: new ol.style.Stroke({
			color: '#ffcc33',
			width: 2
		}),
		image: new ol.style.Circle({
			radius: 7,
			fill: new ol.style.Fill({
				color: '#ffcc33'
			})
		})
	})
});
var vector4 = new ol.layer.Vector({		//vector settings for object selection
	source: vectorSource4,
	style: new ol.style.Style({
		fill: new ol.style.Fill({
			color: 'rgba(255, 255, 255, 0.2)'
		}),
		stroke: new ol.style.Stroke({
			color: '#de1907',
			width: 2
		}),
		image: new ol.style.Circle({
			radius: 7,
			fill: new ol.style.Fill({
				color: '#de1907'
			})
		})
	})
});

var raster = new ol.layer.Tile({
    source: new ol.source.OSM()
});

var map = new ol.Map({
  layers: [raster, vector, vector2, vector3, vector4],
  target: 'map',
  view: new ol.View({
    center: [14147819.4439491, 4503739.21820781],
    zoom: 11
  })
});

var draw, snap; // global so we can remove them later
var typeSelect = document.getElementById('olObjType');	// geometry type

var modify = new ol.interaction.Modify({source: vectorSource});	// variable for modify



/**
 * variables for select features
 */
var select = null;  // refer to currently selected interaction
var selectClick = new ol.interaction.Select({	// select interaction working on "click"
  condition: ol.events.condition.click,
  filter : function(feature, layer){
	  document.getElementById('status').innerHTML = '&nbsp; 객체 ID : ' + feature.getId();
  }
});
var selectPointerMove = new ol.interaction.Select({		// select interaction working on "pointer move"
  condition: ol.events.condition.pointerMove,
  filter : function(feature, layer){
	  document.getElementById('status').innerHTML = '&nbsp; 객체 ID : ' + feature.getId();
  }
});
var selectAltClick = new ol.interaction.Select({	// select interaction working on "alt click"
  condition: function(mapBrowserEvent) {
    return ol.events.condition.click(mapBrowserEvent) &&
        ol.events.condition.altKeyOnly(mapBrowserEvent);
  },
  filter : function(feature, layer){
	  document.getElementById('status').innerHTML = '&nbsp; 객체 ID : ' + feature.getId();
	  if(feature.getProperties().sig_kor_nm != null) {		// open modal when properties exist
		  $('.modal').fadeIn();
		  $('#sigKor').val(feature.getProperties().sig_kor_nm);
		  $('#sigEng').val(feature.getProperties().sig_eng_nm);
		  $('#sigCd').val(feature.getProperties().sig_cd);
		  $('#numpoints').val(feature.getProperties().numpoints);
	  }
  }
});
$('.modal').click(function(){
	$('.modal').fadeOut();
})
var selectElement = document.getElementById('type');	// select type options

/**
 * change select type
 */
var changeInteraction = function() {
  if (select !== null) {
    map.removeInteraction(select);
  }
  var value = selectElement.value;
  if (value == 'singleclick') {
    select = selectSingleClick;
  } else if (value == 'click') {
    select = selectClick;
  } else if (value == 'pointermove') {
    select = selectPointerMove;
  } else if (value == 'altclick') {
    select = selectAltClick;
  } else {
    select = null;
  }
  if (select !== null) {
    map.addInteraction(select);
    select.on('select', function(e) {

    });
  }
};


/**
 * onchange callback on the select element
 */
selectElement.onchange = changeInteraction;
changeInteraction();



/**
 * Change select box's value so draw method can activate
 */
$(function(){
	$('#olObjType').change();
})

/**
 * Add draw type instance
 */
function addInteractions() {
  draw = new ol.interaction.Draw({
    source: vectorSource,
    type: typeSelect.value
  });
  map.addInteraction(draw);
  snap = new ol.interaction.Snap({source: vectorSource});		// draw and modify together
  map.addInteraction(snap);
}

/**
 * Handle change event
 */
typeSelect.onchange = function() {
	
	// tab menu change
	if(typeSelect.value == "Point") {
		  olCtgry(event, 'POI');
	  } else if(typeSelect.value == "LineString") {
		  olCtgry(event, 'Line');
	  } else if(typeSelect.value == "Polygon") {
		  olCtgry(event, 'Polygon');
	  } else {
		  alert('ERROR Occurred')
	  }
	
	// remove and add interaction on map
	map.removeInteraction(draw);
	map.removeInteraction(snap);
	addInteractions();
 
	// add list when draw ends
	draw.on('drawend', function (e) {
		if(typeSelect.value == "Point") {
			createOlPOI();
			OLPOICOUNT++;
			var POIID = OLPOICOUNT-1;
			e.feature.setId('POINT_' + POIID);
		} else if(typeSelect.value == "LineString") {
			createOlLine();
			OLLINECOUNT++;
			var LINEID = OLLINECOUNT-1;
			e.feature.setId('LINE_' + LINEID);
		} else if(typeSelect.value == "Polygon") {
			createOlPyn();
			OLPYNCOUNT++;
			var PYNID = OLPYNCOUNT-1;
			e.feature.setId('POLYGON_' + PYNID);
		} else {
			alert('ERROR Occurred')
		}
	});
};

	

// add draw type instance for real
addInteractions();



/**
 * add seoul wms
 */
var wmsLayer;	// set layer to local variable
function addWms() {
	map.removeLayer(wmsLayer);
	
	var area = document.getElementById('area').value;
	
	wmsLayer = new ol.layer.Tile({
		source : new ol.source.TileWMS({
			url : 'http://localhost:8089/geoserver/test_workspace/wms',
			params : {
				'VERSION' : '1.1.0',
				'LAYERS' : 'test_workspace:sample_cntofstore_in_seoul',
				'BBOX' : [ 935035.2302138857, 1936665.5480706412, 972067.5688631823, 1966987.1581890113 ],
				'SRS' : 'EPSG:5179',
				'FORMAT' : 'image/png',
				'CQL_FILTER' : "sig_kor_nm like '%" + area + "%'"
			},
			serverType : 'geoserver',
		})
	});
	
	map.addLayer(wmsLayer);
}
/**
 * add station wms
 */
var wmsLayer2;
function srchSttn() {
	map.removeLayer(wmsLayer2);
	
	var sttnNm = document.getElementById('sttnNm').value;
	
		wmsLayer2 = new ol.layer.Tile({
		source : new ol.source.TileWMS({
			url : 'http://localhost:8089/geoserver/test_workspace/wms',
			params : {
				'VERSION' : '1.1.0',
				'LAYERS' : 'test_workspace:station',
				'BBOX' : [ 934860.0, 1936564.125, 970249.0625, 1957042.0 ],
				'SRS' : 'EPSG:5179',
				'FORMAT' : 'image/png',
				'CQL_FILTER' : "station like '%" + sttnNm + "%'"
			},
			serverType : 'geoserver',
		})
	});
	
	map.addLayer(wmsLayer2);
}
/**
 * remove wms Layer
 */
function removeWms() {
	map.removeLayer(wmsLayer);
	map.removeLayer(wmsLayer2);
	$('.multiPopup').remove();
}
/**
 * calculate boundary box and show layer which is in boundary
 */
function calBBox() {
	var x1 = document.getElementById('AX').value;
	var y1 = document.getElementById('AY').value;
	var x2 = document.getElementById('BX').value;
	var y2 = document.getElementById('BY').value;
	
	if(x1<AX,y1<AY,x2<BX,y2<BY) {
		map.removeLayer(vector4);
	} else {
		map.removeLayer(vector4);
		map.addLayer(vector4);
	}
}



/**
 * show popup only certain zoom level
 */
var overlay;
var guState;
vectorSource3.on('change', function(){		// change because the loading will happen in an asynchronous manner
		if (vectorSource3.getState() === 'ready', guState != 'finish') {
			for(i=0; i<25; i++) {
				console.log('for문 실행')
				var coordinate = vectorSource3.getFeatures()[i].getGeometry().getCoordinates();
				var place = vectorSource3.getFeatures()[i].getProperties().sig_kor_nm;
			
				// make div for popup
				var element = document.createElement("div");
				element.classList.add('ol-popup');
				element.innerHTML = '<a id="popup-closer" class="ol-popup-closer"></a> <div class="guPlace"><p>' + place + '</p></div>';
				element.style.display = 'block';
		    
				// make overlay
				overlay = new ol.Overlay({
					element: element,
					autoPan: true,
					className: "multiPopup",
					autoPanMargin: 100,
					autoPanAnimation: {
						duration: 400
					}
				});
		    
				//set position and add to map
				overlay.setPosition(coordinate);
				map.addOverlay(overlay);
				
				if(vectorSource3.getFeatures().length%25 == 0){
					guState = 'finish';
				}
			}
		}
});
vectorSource4.on('change', function() {
	$('.multiPopup').remove();
	guState = 'ready';
});