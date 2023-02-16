var vwSrch = function(){
		$.ajax({
			type: "get",
			url: "http://api.vworld.kr/req/search",
			data : $('#searchForm').serialize(),
			dataType: 'jsonp',
			async: false,
			success: function(data) {
				$('#vwTable').empty();
				if(data.response.status =="NOT_FOUND"){
					alert("검색결과가 없습니다.");
				}else{
					for(var o in data.response.result.items){ 
						if(o==0){
			move(data.response.result.items[o].point.x*1,data.response.result.items[o].point.y*1);
						} else {
							addVwMarker(data.response.result.items[o].point.x*1, data.response.result.items[o].point.y*1, data.response.result.items[o].title);
							vwPaging(data);
						}
					}
				}
			},
			error: function(xhr, stat, err) {}
		});
	}

	var move = function(x,y){
		map.getView().setCenter([ x, y ]); // move map
		map.getView().setZoom(15); // set zoom level
	}



/**
 * move to place when click list
 * @param x
 * @param y
 */
function goVwPlace(x,y) {
	map.getView().setCenter([ x, y ]); // move map
	map.getView().setZoom(20); // set zoom level
}



/**
 * maximize and minimize table
 */
function vwMaximize() {
	$('#vwInterface').css({
		margin: '45rem 0rem 0rem 35rem',
		height: '200px',
		width: '50rem'
	});
}
function vwMinimize() {
	$('#vwInterface').css({
		margin: '5rem 0rem 0rem 95rem',
		height: '4rem',
		width: '20rem'
	});
}



/**
 * add marker when search success
 * @param x
 * @param y
 * @param name
 */
function addVwMarker(x,y,name) {
	
    const point = new ol.Feature({		// make feature
        geometry: new ol.geom.Point([x,y]),		// set position
    })
    point.setId(name);
    vector.getSource().addFeature(point);	//add feature to data source
    
}



/**
 * Enter key function
 * @param e
 */
$(document).keyup(function(e) {
	let code = e.keyCode || e.which;
	if ($('#searchForm:focus') && (e.key=='Enter') || code==13) {   // focus and enter key
	   vwSrch();
	}
});