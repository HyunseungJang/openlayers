<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"  %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
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
				<header id="header">
					<tiles:insertAttribute name="header"/>
				</header>
				<main>
					<h1> QnA </h1>
					<section id="container">
						<form name="readForm" role="form" method="post">
							<input type="hidden" id="bno" name="bno" value="${read.bno}" />
						</form>
							<div class="input-group mb-3">
							  <span class="input-group-text">제목</span>
							  <input class="form-control" id="title" name="title" aria-label="With textarea" value="${read.title}" readonly="readonly">
							  <span class="input-group-text">작성자</span>
							  <input type="text" class="form-control" id="writer" name="writer" aria-label="Username" aria-describedby="basic-addon1" value="${read.writer}" readonly="readonly">
							  <span class="input-group-text">작성일</span>
							  <textarea class="form-control" id="regdate" readonly="readonly"><fmt:formatDate value="${read.regdate}" pattern="yyyy-MM-dd" /></textarea>
							</div>
							<div class="mb-3">
							  <textarea class="form-control" id="content" name="content" rows="15" placeholder="내용을 입력해 주세요" readonly="readonly"><c:out value="${read.content}" /></textarea>
							</div>
							<div>
								<button type="submit" class="btn btn-outline-light" id="update_btn">수정</button>
								<button type="submit" class="btn btn-outline-light" id="delete_btn">삭제</button>
								<button type="submit" class="btn btn-outline-light" id="list_btn">목록</button>
							</div>
					</section>
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
		<script src="resources/js/board/board.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
	</body>
</html>