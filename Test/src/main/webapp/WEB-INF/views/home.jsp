<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<!doctype html>
<html>
<meta charset='utf-8'>
<head>
	<link rel="stylesheet" href="resources/css/xdworld.css"/>
	<title>MyMap</title>
	<style>
		body {
			background-image: url( "resources/images/galaxy.gif" );
		}
	</style>
</head>
<body>
	<div class="mapLoad">
		<button onclick="goXdworld();">XDWORLD 로딩</button>
		<button onclick="goOpenLayers();">OpenLayers 로딩</button>
	</div>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script src="resources/js/page.js"></script>
</body>
</html>