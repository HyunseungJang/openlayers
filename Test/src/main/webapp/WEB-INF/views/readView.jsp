<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"  %>
<!DOCTYPE html>
<html>
	<head>
		<meta charset='utf-8'>
		
		<!-- 모바일 반응형 동작 -->
		<meta name="viewport" content="width=device-width, initial-scale=1">
		
		<!-- CSS -->
		<link rel="stylesheet" href="resources/css/xdworld.css"/>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
		
		<!-- favicon.ico -->
	    <link rel="shortcut icon" href="#">
		
		<!-- fontawesome icon -->
		<script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js"></script>
		<title>MyMap</title>
	</head>
	<script type="text/javascript">
		$(document).ready(function(){
			var formObj = $("form[name='readForm']");
			
			// 수정 
			$(".update_btn").on("click", function(){
				formObj.attr("action", "/updateView");
				formObj.attr("method", "get");
				formObj.submit();				
			})
			
			// 삭제
			$(".delete_btn").on("click", function(){
				formObj.attr("action", "/delete");
				formObj.attr("method", "post");
				formObj.submit();
			})
			
			// 취소
			$(".list_btn").on("click", function(){
				
				location.href = "/mymap/list";
			})
		})
	</script>
	<body class="d-flex h-100 text-center text-bg-dark">
		<div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
			<div class="container">
				<header id="header">
					<tiles:insertAttribute name="header"/>
				</header>
				<main>
					<section id="container">
						<form name="readForm" role="form" method="post">
							<input type="hidden" id="bno" name="bno" value="${read.bno}" />
						</form>
							<table>
								<tbody>
									<tr>
										<td>
											<label for="title">제목</label><input type="text" id="title" name="title" value="${read.title}" readonly="readonly" />
										</td>
									</tr>	
									<tr>
										<td>
											<label for="content">내용</label><textarea id="content" name="content" readonly="readonly"><c:out value="${read.content}" /></textarea>
										</td>
									</tr>
									<tr>
										<td>
											<label for="writer">작성자</label><input type="text" id="writer" name="writer" value="${read.writer}"  readonly="readonly"/>
										</td>
									</tr>
									<tr>
										<td>
											<label for="regdate">작성날짜</label>
											<fmt:formatDate value="${read.regdate}" pattern="yyyy-MM-dd" />					
										</td>
									</tr>		
								</tbody>			
							</table>
							<div>
								<button type="submit" class="update_btn">수정</button>
								<button type="submit" class="delete_btn">삭제</button>
								<button type="submit" class="list_btn">목록</button>	
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