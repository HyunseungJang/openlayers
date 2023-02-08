/* 폴리곤 생성 */
var pynCount = 0;

function createPolygon() {
	
	setMouseState(21);
	
	Module.canvas.ondblclick = function(e) {
		
		pynCount++;
		
		// 마우스 입력 점 반환
		var map = Module.getMap();
		var inputPoint = map.getInputPoints();
	
		// 점 수가 3점 이상인 경우 진행
		var inputPointCount = inputPoint.count();
		if (inputPoint < 3) {
			return;
		}
	
		// 폴리곤 객체를 저장할 레이어 생성 (이미 생성한 경우 레이어 반환)
		var layerList = new Module.JSLayerList(true);
		var layer = layerList.nameAtLayer("POLYGON_LAYER");
		if (layer == null) {
				
			// 레이어가 없는 경우 새로 생성
			layer = layerList.createLayer("POLYGON_LAYER", Module.ELT_POLYHEDRON);
		}
	
		// 폴리곤 객체 생성
		var currentLayerObjectCount = layer.getObjectCount();
		var polygon = Module.createPolygon("POLYGON_"+currentLayerObjectCount);
	
		// 입력한 지점(inputPoint, part)으로 폴리곤 형태 정의
		var part = new Module.Collection();
		part.add(inputPointCount);
	
		var vertex = new Module.JSVec3Array();
		for (var i=0; i<inputPointCount; i++) {
	
			// 입력한 점 위치에서 고도 5m 를 상승시킨 후 버텍스 추가
			var point = inputPoint.get(i);
			vertex.push(new Module.JSVector3D(point.Longitude, point.Latitude, point.Altitude+5.0));
		}
	
		polygon.setPartCoordinates(vertex, part);
	
		// 레이어에 객체 추가
		layer.addObject(polygon, 0);
	
		// 입력 점 초기화
		map.clearInputPoint();
		
		$('#tablePolygon').append('<tr class="pynList" id="' + pynCount + '">'
	    		+ '<td><span> Polygon ' + pynCount + '</span></td>'
	    		+ '<td><button onclick="updatePyn()">수정</button></td>'
	    		+ '<td><button onclick="removePyn(this)">삭제</button></td>'
	    		+ '</tr>');
	
	}
	
}

/* 마우스 모드 설정 
- 0 : 지도 이동
- 21 : 라인 입력
*/
function setMouseState(_set) {
	Module.XDSetMouseState(_set);	
}

function updatePyn() {
	
	// 카메라 위치 설정
	Module.getViewCamera().setLocation(new Module.JSVector3D(126.001, 36.9995, 500.0));
	
}

function removePyn(obj) {
	
	// ID에 따른 리스트 삭제
	var id = obj.parentElement.parentElement.id;
	var imgId = parseInt(id) - 1;
	$('.pynList').remove('#' + id);
	
	// POI 오브젝트를 추가 할 레이어 생성 및 삭제
	var layerList = new Module.JSLayerList(true);
	var layer = layerList.nameAtLayer("POLYGON_LAYER");
	if (layer == null) {
		layer = layerList.createLayer("POLYGON_LAYER", Module.ELT_POLYHEDRON);
	}
	layer.removeAtKey("POLYGON_" + imgId);
	
}

function emptyPyn() {
	
	// Alert창 및 테이블 삭제
	alert('Delete all?');
	$('.pynList').remove();

	// 폴리곤 객체를 저장할 레이어 생성 (이미 생성한 경우 레이어 반환)
	var layerList = new Module.JSLayerList(true);
	var layer = layerList.nameAtLayer("POLYGON_LAYER");
	if (layer == null) {
		layer = layerList.createLayer("POLYGON_LAYER", Module.ELT_POLYHEDRON);
	}
	
	// 레이어 삭제
	layer.removeAll();
	
}