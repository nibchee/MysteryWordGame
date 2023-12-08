package com.geekyNib.mysteryWordapi.services;

import org.springframework.stereotype.Service;

@Service
public class WordGridService {

    public String getGridAsString(int gridSize,String word){
        String words[]=word.split(",");
        Grid grid=new Grid(gridSize);
        grid.fillGrid(words);
        char [][] content=grid.getGrid();
        String gridAsString="";
        for(int i=0;i<content.length;i++){
            for(int j=0;j<content[i].length;j++){
                gridAsString+=content[i][j]+" ";
            }
            gridAsString+="\r\n";
        }
        return gridAsString;
    }

}
