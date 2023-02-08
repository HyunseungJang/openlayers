<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	
	<!-- CSS -->
    <link rel="stylesheet" href="resources/css/openlayers.css">
    <link rel="stylesheet" href="https://openlayers.org/en/v4.6.5/css/ol.css" type="text/css">
    
    <!-- favicon.ico -->
    <link rel="shortcut icon" href="#">
    
    <!-- The line below is only needed for old environments like Internet Explorer and Android 4.x -->
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL"></script>
    <script src="https://openlayers.org/en/v4.6.5/build/ol.js"></script>
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/paginationjs/2.1.4/pagination.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/paginationjs/2.1.4/pagination.css"/>
    
    <title>OpenLayers</title>
    
    <style> html, body {height: 100%; padding: 0; margin: 0; } #map { height: 100%; width: 100%;} </style>
</head>
  <body>
  
  	<!-- Search place and show lists -->
	<div id="vwInterface">
		<div id="vwBtn">
	  		<button class="vwBtn" onclick="vwMaximize()">확대</button>
	  		<button class="vwBtn" onclick="vwMinimize()">축소</button>
	  	</div>
		<form id="searchForm" action="#" class="form_data" onsubmit="return false;search();">
			<input type="hidden" name="page" value="1" />
			<input type="hidden" name="type" value="PLACE" />
			<input type="hidden" name="request" value="search" />
			<input type="hidden" name="apiKey" value="F9456F32-95A9-3CAD-8364-926B6B613A6A" />
			<input type="hidden" name="domain" value="http://localhost:8080" />
			<input type="hidden" name="crs" value="EPSG:3857" />
			<div>
			<input type="text" id="searchValue" name="query" value="" placeholder="장소를 입력해주세요" style="width: 90%;" /> <a href="javascript:vwSrch();" >검색</a> 
			</div>
		</form>
		<table id=vwTable></table>
		<div class="pagination">
		    <section>
		        <div id="data-container"></div>
		        <div id="pagination"></div>
		    </section>
		</div>
	</div>
	
	<!-- OpenLayers Map -->  
	<div id="map" class="map">
	
		<!-- Select Interactions -->
		<div id="featureOpt">
			<div id="selectOpt">
				<div id="selectList" class="selectOpt">
					<form class="form-inline">
				      <label>&nbsp; 선택 옵션 &nbsp;</label>
				        <select id="type" class="form-control">
				          <option value="click" selected>객체생성</option>
				          <option value="pointermove">객체정보조회</option>
				          <option value="altclick">서울시자치구(alt+클릭)</option>
				        </select>
				    </form>
				</div>
				<div id="featureId" class="selectOpt">
				    <span id="status">&nbsp; 객체 ID : </span>
				</div>
			</div>
		    <div id="wmsOpt">
			    <div id="srchByCrdnt">
			    	<div id="crdnt" class="wms crdnt">
				    	<div class="wms crdntBox">
					    	<span>좌하단 좌표&nbsp;:&nbsp;&#40;</span>
					    	<input class="bbox" id="AX" value="14067432" placeholder="x좌표 입력" type="text">
					    	<span>&#44;</span>
					    	<input class="bbox" id="AY" value="4459374" placeholder="y좌표 입력" type="text">
					    	<span>&#41;</span>
				    	</div>
				    	<div class="wms crdntBox">
				    		<span>우상단 좌표&nbsp;:&nbsp;&#40;</span>
				    		<input class="bbox" id="BX" value="14228179" placeholder="x좌표 입력" type="text">
				    		<span>&#44;</span>
				    		<input class="bbox" id="BY" value="4548117" placeholder="y좌표 입력" type="text">
				    		<span>&#41;</span>
				    	</div>
			    	</div>
			    	<div id="crdntBtn" class="wms crdnt">
			    		<button onclick="calBBox()" id="srchByBBox">경계로 검색</button>
			    	</div>
			    </div>
			    <div id="srchByWmsNm">
				    <div class="srchByWmsNm" id="srchByGu">
				    	<div class="wmsSrch">
					    	<select id="area" class="form-control">
					          <option value="%구" selected>전체</option>
					          <option value="강남구">강남구</option>
					          <option value="관악구">관악구</option>
					          <option value="구로구">구로구</option>
					          <option value="마포구">마포구</option>
					          <option value="양천구">양천구</option>
					          <option value="종로구">종로구</option>
					        </select>
				    	</div>
				    	<div class="wmsSrch wmsBtn"><button onclick="addWms()">레이어 검색</button></div>
				    	<div class="wmsSrch wmsBtn"><button onclick="removeWms();">레어어 삭제</button></div>
				    </div>
				    <div class="srchByWmsNm" id="srchBySubway">
				        <input type="text" placeholder="지하철명을 입력해주세요" id="sttnNm" class="wmsSrch">
				    	<div class="wmsSrch wmsBtn"><button onclick="srchSttn()">지하철 검색</button></div>
				    	<div class="wmsSrch wmsBtn"><button onclick="removeWms();">레어어 삭제</button></div>
				    </div>
			    </div>
		    </div>
		</div>
	
		<!-- Draw and Modify Interactions -->
	  	<div id="interface">
			<table id="menuTable" style="width: 350px;">
			  <thead>
				<tr>
				  <th>
					<button id="homeBtn" onclick="goHome();">홈으로</button>
				  </th>
				  <th>
				    <label id="geoType"> &nbsp;&nbsp; 타입 설정</label>
				  </th>
				  <th>	
					<form class="form-inline">
				      <select id="olObjType">
				        <option value="Point">Point</option>
				        <option value="LineString">LineString</option>
				        <option value="Polygon">Polygon</option>
				      </select>
				    </form>
		    	  </th>
		    	</tr>
			  </thead>
			</table>
			
			<!-- Tab content -->
			<div id="updtTab">
				<span>&nbsp;수정 허용</span>
				<input type="radio" name="updtBtn" onclick="updtOl()">
			</div>
			
			<div id="POI" class="tabcontent">
			  <table class="tabTable" id="olPOITable" style="width: 350px;">
			    <tr>
				    <td>POI Name</td>
			        <td colspan="2"><button onclick="emptyOl(1);">전체삭제</button></td>
			    </tr>
			  </table>
			</div>
			
			<div id="Line" class="tabcontent">
			  <table class="tabTable" id="olLineTable" style="width: 350px;">
			    <tr>
			        <td>Line Name</td>
			        <td colspan="2"><button onclick="emptyOl(2);">전체삭제</button></td>
			    </tr>
			  </table>
			</div>
			
			<div id="Polygon" class="tabcontent">
			  <table class="tabTable" id="olPynTable" style="width: 350px;">
			    <tr>
				    <td>Polygon Name</td>
				    <td colspan="2"><button onclick="emptyOl(3);">전체삭제</button></td>
			    </tr>
			  </table>
			</div>
		</div>
    </div>
	<div class="modal">
   		<div class="modal_body">
   			<div class="areaValueList">
		   		<span>한글명</span>
		   		<input type="text" class="areaValue" id="sigKor">
   			</div>
   			<div class="areaValueList">
		   		<span>영문명</span>
		   		<input type="text" class="areaValue" id="sigEng">
   			</div>
   			<div class="areaValueList">
		   		<span>아이디</span>
		   		<input type="text" class="areaValue" id="sigCd">
   			</div>
   			<div class="areaValueList">
		   		<span>인구수</span>
		   		<input type="text" class="areaValue" id="numpoints">
   			</div>
   		</div>
   	</div>
	
	<!-- JS File -->
	<script src="resources/js/page.js"></script>
	<script src="resources/js/ol/main.js"></script>
	<script src="resources/js/ol/main-list.js"></script>
	<script src="resources/js/ol/olObj.js"></script>
	
	<!-- Pointer events polyfill for old browsers, see https://caniuse.com/#feat=pointer -->
    <script src="https://cdn.jsdelivr.net/npm/elm-pep@1.0.6/dist/elm-pep.js"></script>
	
  </body>
</html>