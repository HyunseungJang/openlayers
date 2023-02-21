// Move page
function goHome() {
	location.replace('/mymap');
}
function goXdworld() {
	location.href="xdworld";
}
function goOpenLayers() {
	location.href="openlayers";
}
function goReadView(bno) {
	location.href="/mymap/readView?bno=" + bno;
}
function goWriteView() {
	location.href="/mymap/writeView";
}



// Open XDWORLD's category
function xdwCtgry(ctgry, id) {
	
	// initialize
	move();
	setMouseState(1);
	
	// open category
	cmmnCtgry(ctgry, id);
	
	// layerList (POI, Line, Polygon)
	var layerList = new Module.JSLayerList(true);
	var layer = layerList.createLayer("POI_TEST", Module.ELT_3DPOINT);
	let lineLayer = layerList.nameAtLayer("Line_Option");
	var pynLayer = layerList.nameAtLayer("POLYGON_LAYER");
	if (pynLayer == null) {
		pynLayer = layerList.createLayer("POLYGON_LAYER", Module.ELT_POLYHEDRON);
	}
	
	// layer visible settings (POI, Line, Polygon)
	if(id == "POI") {

		layer.setVisible(true);
		if(lineLayer != null) {
			lineLayer.setVisible(false);
		}
		pynLayer.setVisible(false);
		
	} else if(id == "Line") {
		
		layer.setVisible(false);
		if(lineLayer != null) {
			lineLayer.setVisible(true);
		}
		pynLayer.setVisible(false);
		
	} else if(id == "Polygon") {
		
		layer.setVisible(false);
		if(lineLayer != null) {
			lineLayer.setVisible(false);
		}
		pynLayer.setVisible(true);
		
	} else {
		alert('ERROR Occurred')
	}
	
}



// Open OpenLayers' category
function olCtgry(ctgry, id) {
	// empty all objects and lists before changing category
	var features = vector.getSource().getFeatures();
	features.forEach((feature) => {
		vector.getSource().removeFeature(feature);
	});
	
	$('.olPOIList').remove();
	$('.olLineList').remove();
	$('.olPynList').remove();
	
	cmmnCtgry(ctgry, id);
	
}



/**
 * Open category method for both XDWORLD and OpenLayers
 * @param ctgry		// event
 * @param id		// POI, line, polygon
 */
function cmmnCtgry(ctgry, id) {
	
	// change tab menu
	var i, tabcontent, tablinks;
	
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
	  tabcontent[i].style.display = "none";
	}
	
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
	  tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	
	document.getElementById(id).style.display = "block";
	
	try {
		ctgry.currentTarget.className += " active";
	} catch (e) {
		// TODO: handle exception
	}
	
}



/**
 * VWORLD results paginations
 * @param data		// data from vwSrch of main-list.js
 */
function vwPaging(data) {
    let container = $('#pagination');
    container.pagination({
    	dataSource: [
    		data.response.result.items
        ],
        callback: function (data, pagination) {
            var dataHtml = '';

            for(var i=1; i <= data[0].length-1; i++) {
	            $.each(data, function (index, item) {
	                dataHtml += '<tr><td><span class="vwList" onclick="goVwPlace('	// call function that can go to place
	                    + data[0][i].point.x*1 + ','
	                    + data[0][i].point.y*1 + ');">'
	                    + data[0][i].title + '</span></td>'	// show place lists in Table
	                    + '<td><span>' + data[0][i].address.road + '</span></td></tr>';
	            });
            }

            dataHtml += '';

            $("#vwTable").html(dataHtml);
        }
    })
}