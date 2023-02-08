var count = 1;
//var COUNT = 1;

function createPOI() {
		
    	Module.canvas.onclick = function(e) {
    		var screenPosition = new Module.JSVector2D(e.x, e.y);
    		
    		// 화면->지도 좌표 변환
    		var mapPosition = Module.getMap().ScreenToMapPointEX(screenPosition);
    		
    		var screenX = e.x;
    		var screenY = e.y;
    		
    		var mapLon = mapPosition.Longitude;
    		var mapLat = mapPosition.Latitude;
    		var mapAlt = mapPosition.Altitude;
    		
    		// POI 오브젝트를 추가 할 레이어 생성
    		var layerList = new Module.JSLayerList(true);
    		var layer = layerList.createLayer("POI_TEST", Module.ELT_3DPOINT);

    		// Image POI
    		var img = new Image();
    		
    		
    		img.onload = function() {
    			
    			count++;

    			// 이미지 로드 후 캔버스에 그리기
    			var canvas = document.createElement('canvas');
    			var ctx = canvas.getContext('2d');
    			canvas.width = this.width;
    			canvas.height = this.height;
    			ctx.drawImage(img, 0, 0);
    			
    			// 이미지 POI 생성
    			var poi_with_image = Module.createPoint("POI_WITH_IMAGE_" + count);
    			poi_with_image.setPosition(new Module.JSVector3D(mapLon, mapLat, mapAlt));
    			poi_with_image.setImage(ctx.getImageData(0, 0, this.width, this.height).data, this.width, this.height);
    			this.layer.addObject(poi_with_image, 0);

    	    };
    	    img.layer = layer;
    	    img.src = "resources/images/map_pin.png"
    	    	
    	    $('#tablePOI').append('<tr class="pointList" id="' + count + '">'
    	    		+ '<td><span> POI ' + count + '</span></td>'
    	    		+ '<td><button onclick="updatePOI(this)">수정</button></td>'
    	    		+ '<td><button onclick="removePOI(this)">삭제</button></td>'
    	    		+ '</tr>');

    	}
    		
}

function move() {
	
	Module.canvas.onclick = function(e) {
		
	}
	
}

function updatePOI(obj) {
	
	Module.canvas.onclick = function(e) {

	}
	
	// ID에 따른 Alert
	var id = obj.parentElement.parentElement.id;
	var imgId = parseInt(id);
	alert("POI_WITH_IMAGE_" + imgId + '수정');
	
	Module.canvas.addEventListener("Fire_EventSelectedObject", function(e){
		// 기능 구현
		console.log(e);
		console.log('obj selected');
	});
	
	

	
}

function removePOI(obj) {
	
	// ID에 따른 리스트 삭제
	var id = obj.parentElement.parentElement.id;
	var imgId = parseInt(id) + 1;
	$('.pointList').remove('#' + id);
	
	// POI 오브젝트를 추가 할 레이어 생성 및 삭제
	var layerList = new Module.JSLayerList(true);
	var layer = layerList.createLayer("POI_TEST", Module.ELT_3DPOINT);
	layer.removeAtKey("POI_WITH_IMAGE_" + imgId);
	
}

function emptyPOI() {
	
	// Alert창 및 테이블 삭제
	alert('Delete all?');
	$('.pointList').remove();

	// POI 오브젝트를 추가 할 레이어 생성 및 삭제
	var layerList = new Module.JSLayerList(true);
	var layer = layerList.createLayer("POI_TEST", Module.ELT_3DPOINT);
	layer.removeAll();
	
}

function clickPOI() {
	
	var canvas = document.createElement('canvas');
	canvas.id = "canvas";
	canvas.addEventListener("Fire_EventSelectedObject", function(e){
			// 기능 구현
		console.log(e);
	});
	
}
