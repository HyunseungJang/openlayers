

// create object
var OLPOICOUNT = 1;
var OLLINECOUNT = 1;
var OLPYNCOUNT = 1;

function createOlPOI() {
	$('#olPOITable').append('<tr class="olPOIList" id="' + OLPOICOUNT + '">'
    		+ '<td><span> POI ' + OLPOICOUNT + '</span></td>'
    		+ '<td colspan="2"><button onclick="rmvOl(this, 1)">삭제</button></td>'
    		+ '</tr>');
}

function createOlLine() {
	$('#olLineTable').append('<tr class="olLineList" id="' + OLLINECOUNT + '">'
    		+ '<td><span> Line ' + OLLINECOUNT + '</span></td>'
    		+ '<td colspan="2"><button onclick="rmvOl(this, 2)">삭제</button></td>'
    		+ '</tr>');
}

function createOlPyn() {
	$('#olPynTable').append('<tr class="olPynList" id="' + OLPYNCOUNT + '">'
    		+ '<td><span> Polygon ' + OLPYNCOUNT + '</span></td>'
    		+ '<td colspan="2"><button onclick="rmvOl(this, 3)">삭제</button></td>'
    		+ '</tr>');
}



/**
 * empty all objects
 * @param olType
 */
function emptyOl(olType) {
	
	alert('empty all');
	
	// empty lists
	if(olType == 1) {
		$('.olPOIList').remove();
	} else if(olType == 2) {
		$('.olLineList').remove();
	} else if(olType == 3) {
		$('.olPynList').remove();
	} else {
		
	}
	
	// empty features
	var features = vector.getSource().getFeatures();
	features.forEach((feature) => {
		vector.getSource().removeFeature(feature);
	});
};



/**
 * Remove objects (POI, Line, Polygon)
 * @param olObj
 * @param olId
 */
function rmvOl(olObj, olId) {
	
	// common variable
	var id = olObj.parentElement.parentElement.id;
	var imgId = parseInt(id) + 1;
	
	// remove lists and features
	if(olId == 1) {
		$('.olPOIList').remove('#' + id);
		var features = vector.getSource().getFeatureById('POINT_' + id);
	} else if(olId == 2) {
		$('.olLineList').remove('#' + id);
		var features = vector.getSource().getFeatureById('LINE_' + id);
	} else if(olId == 3) {
		$('.olPynList').remove('#' + id);
		var features = vector.getSource().getFeatureById('POLYGON_' + id);
	} else {
		
	}
	vector.getSource().removeFeature(features);
	
}


/**
 * update OpenLayers so it can be modified
 */
function updtOl() {
	map.addInteraction(modify);
}