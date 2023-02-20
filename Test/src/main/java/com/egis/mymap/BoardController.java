package com.egis.mymap;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.egis.service.BoardService;
import com.egis.vo.BoardVO;

@Controller
@RequestMapping("/")
public class BoardController {
	
	@Inject
	BoardService service;
	
	// 게시판 글 작성 화면
	@RequestMapping(value = "/writeView", method = RequestMethod.GET)
	public String writeView() throws Exception{		// public void를 사용하면 return을 써주지 않아도 됨

		return "writeView.tiles";
	}
	
	// 게시판 글 작성
	@RequestMapping(value = "/write", method = RequestMethod.POST)
	public String write(BoardVO boardVO) throws Exception{
		
		service.write(boardVO);
		
		return "redirect:/list";		// 데이터 재조회를 하기 위해서 redirect:로 url참조
	}
	
	// 게시판 목록 조회
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public void list(Model model) throws Exception{

		model.addAttribute("list",service.list());
	}
	
	// 게시판 조회
	@RequestMapping(value = "/readView", method = RequestMethod.GET)
	public String read(BoardVO boardVO, Model model) throws Exception{
		
		model.addAttribute("read", service.read(boardVO.getBno()));
		
		return "readView.tiles";
	}
}