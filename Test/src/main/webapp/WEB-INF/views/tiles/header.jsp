<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<!doctype html>
<html>
		<div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
			<div class="container">
			  <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
			    <a href="/mymap" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
			      <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"/></svg>
			      <span id="mainHeader" class="fs-4" style="color:white">XDWorld & OpenLayers Project</span>
			    </a>
			
			    <ul class="nav nav-pills">
			      <li class="nav-item"><a href="/mymap" class="nav-link active" aria-current="page">Home</a></li>
			      <li class="nav-item"><a href="/mymap/xdworld" class="nav-link">XDWorld</a></li>
			      <li class="nav-item"><a href="/mymap/openlayers" class="nav-link">OpenLayers</a></li>
			      <li class="nav-item"><a href="/mymap/list" class="nav-link">QnA</a></li>
			      <li class="nav-item"><a href="/mymap/login" class="nav-link">Login</a></li>
			    </ul>
			  </header>
			</div>
		</div>	
</html>