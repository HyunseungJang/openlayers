package com.egis.mymap;

import java.util.Locale;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;



@Controller
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MapController {
	
	@RequestMapping(value = "/xdworld.do", method = RequestMethod.GET)
	public String xdworld(Locale locale, Model model) {
		
		
		return "xdworld";
	}
	
	@CrossOrigin(origins = "*")
	@RequestMapping(value = "/openlayers.do", method = RequestMethod.GET)
	public String openLayers(Locale locale, Model model) {
		
		
		return "openlayers";
	}

}
