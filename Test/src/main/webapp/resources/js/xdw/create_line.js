var lineCount = 0;

function createLine( _id, _coordinate, _type) {
	
	var point;
	var points = new Array();
	
	Module.canvas.onclick = function(e) {
		var screenPosition = new Module.JSVector2D(e.x, e.y);
		
		// 화면->지도 좌표 변환
		var mapPosition = Module.getMap().ScreenToMapPointEX(screenPosition);
		
		var screenX = e.x;
		var screenY = e.y;
		
		var mapLon = mapPosition.Longitude;
		var mapLat = mapPosition.Latitude;
		var mapAlt = mapPosition.Altitude;
		
		point = [mapLon, mapLat, mapAlt];
		points.push(point);
		
		var _id = "LINE_1";
		var _coordinate = [points[0], points[1]];
		if(points.length != 2) {
			var _coordinate = [points[0], points[0]];
		}
		
		var _type = 1;		
		
		let coordinates = {
				coordinate: _coordinate,						// 정점 배열
				style: "XYZ",
				// style에 따른 배열 관계
				// "XY" = [x, y],[x, y],[..]
				// "XYZ" = [x, y, z],[x, y, z],[...]
				// "XYZARRAY" = [x, y, z, x, y, z ...]
				// "JSVector3D" = JSVector3D 인스턴스
			};

			let object_option = null;

			if (_type == 1) object_option = createNormalLineJson(coordinates);
			else if (_type == 2) object_option = createDashLineJson(coordinates, _type);
			else if (_type == 3) object_option = createDashLineJson(coordinates, _type);
			else if (_type == 4) object_option = createDashLineJson(coordinates, _type);
			else if (_type == 5) object_option = createDashLineJson(coordinates, _type);
			else if (_type == 6) object_option = createDashLineJson(coordinates, _type);
			else if (_type == 7) object_option = createArrowLineJson(coordinates);
			else if (_type == 8) object_option = createOutLineJson(coordinates);

			let line = Module.createLineString(_id + lineCount)
			console.log(line.createbyJson(object_option));

			let layerList = new Module.JSLayerList(true);
			let lineLayer = layerList.nameAtLayer("Line_Option");
			layerList.createLayer("Line_Option", Module.ELT_3DLINE);
			if(points.length == 2) {
				lineLayer.addObject(line, 0);				
			}
			
			// 점 수가 2점인 경우 진행
			if (points.length == 2) {
				points = [];
				lineCount++;
				$('#tableLine').append('<tr class="lineList" id="' + lineCount + '">'
			    		+ '<td><span> Line ' + lineCount + '</span></td>'
			    		+ '<td><button onclick="updateLine()">수정</button></td>'
			    		+ '<td><button onclick="removeLine(this)">삭제</button></td>'
			    		+ '</tr>');
				return;
			}
	}
		
}

function createNormalLineJson(_coordinates) {
	let data = {
		coordinates: _coordinates,
		type: 0,											// 실선 생성 		
		union: false,										// 지형 결합 유무
		depth: true,										// 오브젝트 겹침 유무
		color: new Module.JSColor(255, 255, 0, 0),			// ARGB 설정
		width: 1,											// 선 굵기
	}
	return data;
}

function createArrowLineJson(_coordinates) {
	let data = {
		coordinates: _coordinates,
		type: 3,											// 화살표선 생성 		
		union: false,										// 지형 결합 유무
		depth: true,										// 오브젝트 겹침 유무
		color: new Module.JSColor(255, 255, 0, 0),			// ARGB 설정
		width: 5,											// 선 굵기( type 3 일떄 width 1로 설정 시 화살표 X)
	}
	return data;
}

function createOutLineJson(_coordinates) {
	let data = {
		coordinates: _coordinates,
		type: 1,											// 그라데이션 선 생성 		
		union: false,										// 지형 결합 유무
		depth: true,										// 오브젝트 겹침 유무
		color: new Module.JSColor(200, 255, 0, 100),		// fill ARGB 설정
		strokecolor: new Module.JSColor(200, 100, 0, 255),	// stroke ARGB 설정
		strokewidth: 6.0,									// stroke 굵기 설정
		width: 10,											// 선 굵기( type 3 일떄 width 1로 설정 시 화살표 X)
	}
	return data;
}

function createDashLineJson(_coordinates, _type) {

	let union, depth,
		r, g, b, a,
		width, dash;

	union = false;	// 지형 결합 X
	depth = false;	// 지형 겹침 발생 금지

	if (_type == 2) {
		r = 0; g = 255; b = 0; a = 255;		// 녹색
		width = 2;							// 선 굵기
		dash = 5;							// 점선 O
	} else if (_type == 3) {
		depth = true;						// 지형 겹침 발생 
		r = 0; g = 0; b = 255; a = 255;		// 파랑
		width = 3;							// 선 굵기
		dash = 10;							// 점선 O

	} else if (_type == 4) {
		union = true;						// 지형결합 O
		r = 255; g = 255; b = 0; a = 255;	// 노랑
		width = 4;							// 선 굵기
		dash = 15;							// 점선 O
	} else if (_type == 5) {
		union = true;						// 지형결합 O
		r = 255; g = 0; b = 255; a = 255;	// 보라
		width = 5;							// 선 굵기
		dash = 20;							// 점선 O
	} else if (_type == 6) {
		union = true;						// 지형결합 O
		r = 255; g = 255; b = 255; a = 255;	// 하얀
		width = 6;							// 선 굵기
		dash = 25;							// 점선 O		
	}

	let data = {
		coordinates: _coordinates,
		type: 4,										// 점선 생성 
		union: union,									// 지형 결합 유무
		depth: depth,									// 지형 겹침 X
		color: new Module.JSColor(a, r, g, b),			// ARGB 설정
		width: width,									// 선 굵기
		dash: dash,										// 점선 간격(0)
	}
	return data;
}

function updateLine() {
	
	// 카메라 위치 설정
	Module.getViewCamera().setLocation(new Module.JSVector3D(126.001, 36.9995, 500.0));
	
}

function removeLine(obj) {
	
	// ID에 따른 리스트 삭제
	var id = obj.parentElement.parentElement.id;
	var imgId = parseInt(id) - 1;
	$('.lineList').remove('#' + id);
	
	// Line 오브젝트를 추가 할 레이어 생성 및 삭제
	var layerList = new Module.JSLayerList(true);
	let lineLayer = layerList.nameAtLayer("Line_Option");
	if (lineLayer == null) {
		layerList.createLayer("Line_Option", Module.ELT_3DLINE);
	}
	lineLayer.removeAtKey("LINE_1" + imgId);
	
	console.log("LINE_1" + imgId);
	
}

function emptyLine() {
	
	// Alert창 및 테이블 삭제
	alert('Delete all?');
	$('.lineList').remove();
	
	// 폴리곤을 추가 할 레이어 생성
	var layerList = new Module.JSLayerList(true);
	let lineLayer = layerList.nameAtLayer("Line_Option");
	if (lineLayer == null) {
		layerList.createLayer("Line_Option", Module.ELT_3DLINE);
	}
	
	// 레이어 삭제
	lineLayer.removeAll();
	
}