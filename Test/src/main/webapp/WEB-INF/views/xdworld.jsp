<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<!doctype html>
<html>
<meta charset='utf-8'>
<head>
	<link rel="stylesheet" href="resources/css/xdworld.css"/>
	<title>XDWORLD</title>
	<style>
		#interface {
			display: block;
			position: absolute;
			z-index: 9;
			background-color: #FFFFFF;
			padding: 10px 10px 10px 10px;
			border-radius: 5px;
			font-size: 13px;
			font-weight: bold;
			opacity: 0.9;
			height:200px;
			overflow: auto;
		}
		
		.tabcontent {
		  display: none;
		}				
	</style>
</head>
<body>
	<div id="interface" onmouseout="mouseOverInterface(false);" onmouseover="mouseOverInterface(true);">
		<table style="width: 350px;">
		<tr>
		  <td colspan="3">
			<button id="homeBtn" onclick="goHome();">Home</button>
		  </td>
		</tr>
		<tr>
		  <td><button class="tablinks" onclick="xdwCtgry(event, 'POI');">POI</button></td>
		  <td><button class="tablinks" onclick="xdwCtgry(event, 'Line');">Line</button></td>
		  <td><button class="tablinks" onclick="xdwCtgry(event, 'Polygon');">Polygon</button></td>
		</tr>
		</table>

		<!-- Tab content -->
		<div id="POI" class="tabcontent">
		  <table id="tablePOI" style="width: 350px;">
		    <tr>
			    <td><button onclick="createPOI();">POI 입력</button></td>
		        <td><button onclick="emptyPOI();">전체삭제</button></td>
		        <td></td>
		    </tr>
		    </table>
		</div>
		
		<div id="Line" class="tabcontent">
		  <table id="tableLine" style="width: 350px;">
		    <tr>
		        <td><button onclick="createLine();">Line 입력</button></td>
		        <td><button onclick="emptyLine();">전체삭제</button></td>
		        <td></td>
		    </tr>
		    </table>
		</div>
		
		<div id="Polygon" class="tabcontent">
		  <table id="tablePolygon" style="width: 350px;">
		    <tr>
			    <td><button onclick="createPolygon();">Polygon 입력</button></td>
			    <td><button onclick="emptyPyn();">전체삭제</button></td>
			    <td></td>
		    </tr>
		    </table>
		</div>
	</div>

	<script>
		function mouseOverInterface(_isOver) {
			if (typeof Module == "object") {
				Module.XDIsMouseOverDiv(_isOver);
			}
		}
		window.onresize = function(e) {
			if (typeof Module == 'object') {
				if (typeof Module.Resize == 'function') {
					Module.Resize(window.innerWidth, window.innerHeight);
					Module.XDRenderData();
				}
			}
		};
		var script = document.createElement('script');
		script.src = 'resources/js/xdw/init.js';
		document.body.appendChild(script);
	</script>
	
	<!-- jQuery library -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	
	<!-- JS File -->
	<script src="resources/js/page.js"></script>
	<script src="resources/js/xdw/create_point.js"></script>
	<script src="resources/js/xdw/create_line.js"></script>
	<script src="resources/js/xdw/create_polygon.js"></script>
</body>
</html>