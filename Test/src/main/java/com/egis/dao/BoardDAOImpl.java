package com.egis.dao;

import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.egis.vo.BoardVO;

@Repository
public class BoardDAOImpl implements BoardDAO {
	
	@Inject
	private SqlSession sqlSessoin;
	
	// 게시물 작성
	@Override
	public void write(BoardVO boardVO) throws Exception {
		sqlSessoin.insert("boardMapper.insert", boardVO);
	}
	
	// 게시판 글 목록 조회
	@Override
	public List<BoardVO> list() throws Exception {
	
		return sqlSessoin.selectList("boardMapper.list");

	}
	
	// 게시물 조회
	@Override
	public BoardVO read(int bno) throws Exception {
			
		return sqlSessoin.selectOne("boardMapper.read", bno);
	}

	// 게시물 수정
	@Override
	public void update(BoardVO boardVO) throws Exception {
		
		sqlSessoin.update("boardMapper.update", boardVO);
	}

	// 게시물 삭제
	@Override
	public void delete(int bno) throws Exception {
		
		sqlSessoin.delete("boardMapper.delete", bno);
	}
	
}
