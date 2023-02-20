package com.egis.controller;

import java.util.Locale;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;



@Controller
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MapController {
	
	@RequestMapping(value = "/xdworld", method = RequestMethod.GET)
	public String xdworld(Locale locale, Model model) {
		
		
		return "xdworld";
	}
	
	@CrossOrigin(origins = "*")
	@RequestMapping(value = "/openlayers", method = RequestMethod.GET)
	public String openLayers(Locale locale, Model model) {
		
		
		return "openlayers";
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login(Locale locale, Model model) {
		
		
		return "login.tiles";
	}

}
