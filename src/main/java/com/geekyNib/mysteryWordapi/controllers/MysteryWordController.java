package com.geekyNib.mysteryWordapi.controllers;



import com.geekyNib.mysteryWordapi.services.WordGridService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import  java.util.List;
@RestController("/")
public class MysteryWordController {

    @Autowired
    WordGridService wordGridService;
    @GetMapping("/grid")
    public String createWordGrid(@RequestParam  int gridSize,@RequestParam String words){
      return wordGridService.getGridAsString(gridSize,words);
    }
}
