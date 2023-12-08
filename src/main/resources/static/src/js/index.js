//import { Grid } from "./grid.js";
class Grid {

    constructor() {
        this.wordSelectMode = false;
        this.selectedItems = [];
        this.firstSelectedItem;
        this.gridArea = null;
        this.words = [];
        this.foundWords = [];
    }

    getCellsInRange(firstLetter, currentLetter) {
        console.log("[getCellsInRange()]: firstLetter " + firstLetter.x + " " + firstLetter.y + " currentLetter " + currentLetter.x + " " + currentLetter.y);
        let cellsInRange = [];
        //IF REVERSE SELECTING
        if (firstLetter.x > currentLetter.x || firstLetter.y > currentLetter.y) {
            [currentLetter, firstLetter] = [firstLetter, currentLetter];
        }

        if (firstLetter.y == currentLetter.y) {
            console.log("firstLetter.y === currentLetter.y")
            for (let i = firstLetter.x; i <= currentLetter.x; i++) {
                console.log("[getCellsInRange()]: selected Range cells " + this.gridArea.querySelector(`td[data-x="${i}"][data-y="${currentLetter.y}"]`));
                cellsInRange.push(this.gridArea.querySelector(`td[data-x="${i}"][data-y="${currentLetter.y}"]`));
            }
        }
        else if (firstLetter.x == currentLetter.x) {
            console.log("firstLetter.x === currentLetter.x")
            for (let i = firstLetter.y; i <= currentLetter.y; i++) {
                console.log("[getCellsInRange()]: selected Range cells " + this.gridArea.querySelector(`td[data-x="${currentLetter.x}"][data-y="${i}"]`));
                cellsInRange.push(this.gridArea.querySelector(`td[data-x="${currentLetter.x}"][data-y="${i}"]`));
            }
        } else if ((currentLetter.y - firstLetter.y) == (currentLetter.x - firstLetter.x)) {
            console.log("(currentLetter.y - firstLetter.y) == (currentLetter.x - firstLetter.x)")
            let delta = currentLetter.y - firstLetter.y;
            console.log("delta Is " + delta);
            // for (let i = 0 ;i <=delta; i++) {
            //     console.log("[getCellsInRange()]: selected Range cells " + this.gridArea.querySelector(`td[data-x="${firstLetter.x+i}"][data-y="${firstLetter.y+i}"]`));
            //     cellsInRange.push(this.gridArea.querySelector(`td[data-x="${firstLetter.x+i}"][data-y="${firstLetter.y+i}"]`)); 
            // }
            for (let i = delta; i >= 0; i--) {
                console.log("[getCellsInRange()]: selected Range cells2 " + this.gridArea.querySelector(`td[data-x="${currentLetter.x - i}"][data-y="${currentLetter.y - i}"]`));
                cellsInRange.push(this.gridArea.querySelector(`td[data-x="${currentLetter.x - i}"][data-y="${currentLetter.y - i}"]`));
            }
        }

        return cellsInRange;
    }

    renderGrid(wordGrid, gridSize) {
        var gridArea = document.getElementsByClassName("grid-area")[0];
        //this remove last child
        if (gridArea.lastChild) {
            gridArea.removeChild(gridArea.lastChild);
        }
        this.gridArea = gridArea;

        const tbl = document.createElement("table");
        const tblBody = document.createElement("tbody");
        let index = 0;
        for (let i = 0; i < gridSize; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < gridSize; j++) {
                const cell = document.createElement("td");
                let letter = wordGrid[index++];
                const cellText = document.createTextNode(letter);
                cell.appendChild(cellText);
                cell.setAttribute("data-x", i);
                cell.setAttribute("data-y", j);
                cell.setAttribute("data-letter", letter);
                row.appendChild(cell);
            }
            tblBody.appendChild(row);
        }
        tbl.appendChild(tblBody);
        gridArea.appendChild(tbl);
        // tbl.setAttribute("border", "2");

        //Click Handlers
        tbl.addEventListener("mousedown", (event) => {
            this.wordSelectMode = true;
            const cell = event.target;
            let x = cell.getAttribute("data-x");
            let y = cell.getAttribute("data-y");
            let letter = cell.getAttribute("data-letter");
            // this.selectedItems.push({
            //     x, y, letter, cell
            // });
            this.firstSelectedItem = {
                x, y, letter, cell
            }
            //   this.selectedItems.push(this.firstSelectedItem);
        });

        tbl.addEventListener("mousemove", (event) => {
            console.log("move")
            if (this.wordSelectMode) {
                const cell = event.target;
                //event.target.classList.add("selected");
                let x = +cell.getAttribute("data-x");
                let y = +cell.getAttribute("data-y");
                console.log(x + " " + y);
                let letter = cell.getAttribute("data-letter");

                //         if (this.selectedItems.length > 1) {
                //             const lastSelectedItem = this.selectedItems[this.selectedItems.length - 1];
                //             if (lastSelectedItem.x === x && lastSelectedItem.y === y) return;
                //         }
                //         this.selectedItems.push({
                //             x, y, letter, cell
                //        });
                this.selectedItems.forEach(cell => cell.classList.remove("selected"));
                this.selectedItems = this.getCellsInRange(this.firstSelectedItem, { x, y });
                console.log("Selected Items :" + this.selectedItems);
                this.selectedItems.forEach(cell => cell.classList.add("selected"));


            }
        });

        gridArea.addEventListener("mouseup", (event) => {
            this.wordSelectMode = false;
            const selectedWord = this.selectedItems.reduce((word, cell) => word += cell.getAttribute("data-letter"), '')
            console.log(this.words)
            const reversedSelectedWord = selectedWord.split("").reverse().join("");
            if (this.words.indexOf(selectedWord) != -1) {
                this.foundWords.push(selectedWord)
            } else if (this.words.indexOf(reversedSelectedWord) != -1) {
                this.foundWords.push(reversedSelectedWord);
            } else {
                this.selectedItems.forEach(item => item.classList.remove("selected"));
            }
            this.selectedItems=[]
            console.log(this.foundWords,selectedWord,reversedSelectedWord);

        });
    }
}

const submitWordBtn = document.querySelector(".submit-word");

const GRID_SIZE = 10;
submitWordBtn.addEventListener("click", async () => {
        const grid = new Grid();
    const commaSeparatedWords=document.querySelector("#add-word").value;
    const gridSize=document.querySelector("#grid-size").value;
    let result = await fetchGridInfo(gridSize,commaSeparatedWords);
    grid.words = commaSeparatedWords.split(",")
    grid.renderGrid(result, gridSize);
   let wordListNode=  document.createTextNode(grid.words);
   let wordListSection=document.querySelector(".word-list");
   document.querySelector(".word-list").appendChild(wordListNode);
   if(wordListSection.lastChild){
    wordListSection.removeChild(wordListSection.lastChild);
   }
   wordListSection.appendChild(wordListNode);
    console.log("Button clicked" + result);
});

async function fetchGridInfo(GRID_SIZE,commaSeparatedWords) {
    let response = await fetch(`/grid?gridSize=${GRID_SIZE}&words=${commaSeparatedWords}`);
    let result = response.text();
    return (await result).split(" ");
}

