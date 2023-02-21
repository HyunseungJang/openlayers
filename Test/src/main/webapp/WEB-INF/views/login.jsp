<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"  %>
<!doctype html>
<html>
 <head>
    <meta charset="utf-8">
    
    <!-- 모바일 반응형 동작 -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Hugo 0.108.0">

    
    <!-- CSS -->
    <link rel="canonical" href="https://getbootstrap.com/docs/5.3/examples/sign-in/">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
	<link rel="stylesheet" href="resources/css/login.css"/>

	<!-- favicon.ico -->
    <link rel="shortcut icon" href="#">
	<title>MyMap</title>

  </head>
    <body class="d-flex h-100 text-center text-bg-dark">
	<div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
		<div class="container">
			<header id="header">
				<tiles:insertAttribute name="header"/>
			</header>
		
			<main class="form-signin w-100 m-auto">
			<form class="form-login">
				<h1 class="h3 mb-3 fw-normal">Please sign in</h1>
			
				<div class="form-floating">
				<input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
				</div>
				<div class="form-floating">
				<input type="password" class="form-control" id="floatingPassword" placeholder="Password">
				</div>
			
				<div class="checkbox mb-3">
				<label>
					<input type="checkbox" value="remember-me"> Remember me
				</label>
				</div>
				<button class="w-100 btn btn-lg btn-primary" onclick="alert('준비중입니다.')" type="submit">Sign in</button>
				<p class="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
			</form>
			</main>

			<footer id="footer">
				<tiles:insertAttribute name="footer"/>
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
