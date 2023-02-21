<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ page session="false" %>
<!doctype html>
<html>
	<head>
		<meta charset='utf-8'>
		
		<!-- 모바일 반응형 동작 -->
		<meta name="viewport" content="width=device-width, initial-scale=1">
		
		<!-- CSS -->
		<link rel="stylesheet" href="resources/css/xdworld.css"/>
		<link rel="stylesheet" href="resources/css/list.css"/>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
		
		<!-- favicon.ico -->
	    <link rel="shortcut icon" href="#">
		
		<!-- fontawesome icon -->
		<script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js"></script>
		<title>MyMap</title>
	</head>
	<body class="d-flex h-100 text-center text-bg-dark">
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
			
			<main class="px-3">
				<div id="root">
					<header>
						<h1> QnA </h1>
					</header>
					<!-- board list area -->
				    <div id="board-list" class="container">
				    	<button id="writeBtn" class="btn btn-outline-light btn-sm" onclick="goWriteView()">글쓰기</button>
     					<section id="container" >
							<form role="form" method="post" action="/write">
					            <table class="board-table">
					                <thead>
					                <tr>
					                    <th scope="col" class="th-bno">번호</th>
					                    <th scope="col" class="th-title">제목</th>
					                    <th scope="col" class="th-writer">작성자</th>
					                    <th scope="col" class="th-regdate">등록일</th>
					                </tr>
					                </thead>
					                <tbody>
					                <c:forEach items="${list}" var = "list">
										<tr onclick="goReadView(${list.bno})">
											<td><c:out value="${list.bno}" /></td>
											<td><c:out value="${list.title}" /></td>
											<td><c:out value="${list.writer}" /></td>
											<td><fmt:formatDate value="${list.regdate}" pattern="yyyy-MM-dd"/></td>
										</tr>
									</c:forEach>
					                </tbody>
					            </table>
       						</form>
						</section>
			        </div>
				</div>
			</main>
		
			<div class="container">
			  <footer class="py-5">
			    <div class="row">
			      <div class="col-6 col-md-2 mb-3">
			        <h5>Section</h5>
			        <ul class="nav flex-column">
			          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Home</a></li>
			          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Features</a></li>
			          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Pricing</a></li>
			          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">FAQs</a></li>
			          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">About</a></li>
			        </ul>
			      </div>
			
			      <div class="col-6 col-md-2 mb-3">
			        <h5>Section</h5>
			        <ul class="nav flex-column">
			          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Home</a></li>
			          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Features</a></li>
			          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Pricing</a></li>
			          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">FAQs</a></li>
			          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">About</a></li>
			        </ul>
			      </div>
			
			      <div class="col-6 col-md-2 mb-3">
			        <h5>Section</h5>
			        <ul class="nav flex-column">
			          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Home</a></li>
			          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Features</a></li>
			          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Pricing</a></li>
			          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">FAQs</a></li>
			          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">About</a></li>
			        </ul>
			      </div>
			
			      <div class="col-md-5 offset-md-1 mb-3">
			        <form>
			          <h5>Subscribe to our newsletter</h5>
			          <p>Monthly digest of what's new and exciting from us.</p>
			          <div class="d-flex flex-column flex-sm-row w-100 gap-2">
			            <label for="newsletter1" class="visually-hidden">Email address</label>
			            <input id="newsletter1" type="text" class="form-control" placeholder="Email address">
			            <button class="btn btn-primary" type="button">Subscribe</button>
			          </div>
			        </form>
			      </div>
			    </div>
			
			    <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
			      <p>&copy; 2023 hsj, Inc. All rights reserved.</p>
			      <ul class="list-unstyled d-flex">
			        <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#twitter"/></svg></a></li>
			        <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#instagram"/></svg></a></li>
			        <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#facebook"/></svg></a></li>
			      </ul>
			    </div>
			 </footer>
			</div>
		</div>
		
		<!-- JQUERY -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
		
		<!-- JS -->
		<script src="resources/js/page.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
		
	</body>
</html>