"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//import { Grid } from "./grid.js";
var Grid =
/*#__PURE__*/
function () {
  function Grid() {
    _classCallCheck(this, Grid);

    this.wordSelectMode = false;
    this.selectedItems = [];
    this.firstSelectedItem;
    this.gridArea = null;
    this.words = [];
    this.foundWords = [];
  }

  _createClass(Grid, [{
    key: "getCellsInRange",
    value: function getCellsInRange(firstLetter, currentLetter) {
      console.log("[getCellsInRange()]: firstLetter " + firstLetter.x + " " + firstLetter.y + " currentLetter " + currentLetter.x + " " + currentLetter.y);
      var cellsInRange = []; //IF REVERSE SELECTING

      if (firstLetter.x > currentLetter.x || firstLetter.y > currentLetter.y) {
        var _ref = [firstLetter, currentLetter];
        currentLetter = _ref[0];
        firstLetter = _ref[1];
      }

      if (firstLetter.y == currentLetter.y) {
        console.log("firstLetter.y === currentLetter.y");

        for (var i = firstLetter.x; i <= currentLetter.x; i++) {
          console.log("[getCellsInRange()]: selected Range cells " + this.gridArea.querySelector("td[data-x=\"".concat(i, "\"][data-y=\"").concat(currentLetter.y, "\"]")));
          cellsInRange.push(this.gridArea.querySelector("td[data-x=\"".concat(i, "\"][data-y=\"").concat(currentLetter.y, "\"]")));
        }
      } else if (firstLetter.x == currentLetter.x) {
        console.log("firstLetter.x === currentLetter.x");

        for (var _i = firstLetter.y; _i <= currentLetter.y; _i++) {
          console.log("[getCellsInRange()]: selected Range cells " + this.gridArea.querySelector("td[data-x=\"".concat(currentLetter.x, "\"][data-y=\"").concat(_i, "\"]")));
          cellsInRange.push(this.gridArea.querySelector("td[data-x=\"".concat(currentLetter.x, "\"][data-y=\"").concat(_i, "\"]")));
        }
      } else if (currentLetter.y - firstLetter.y == currentLetter.x - firstLetter.x) {
        console.log("(currentLetter.y - firstLetter.y) == (currentLetter.x - firstLetter.x)");
        var delta = currentLetter.y - firstLetter.y;
        console.log("delta Is " + delta); // for (let i = 0 ;i <=delta; i++) {
        //     console.log("[getCellsInRange()]: selected Range cells " + this.gridArea.querySelector(`td[data-x="${firstLetter.x+i}"][data-y="${firstLetter.y+i}"]`));
        //     cellsInRange.push(this.gridArea.querySelector(`td[data-x="${firstLetter.x+i}"][data-y="${firstLetter.y+i}"]`)); 
        // }

        for (var _i2 = delta; _i2 >= 0; _i2--) {
          console.log("[getCellsInRange()]: selected Range cells2 " + this.gridArea.querySelector("td[data-x=\"".concat(currentLetter.x - _i2, "\"][data-y=\"").concat(currentLetter.y - _i2, "\"]")));
          cellsInRange.push(this.gridArea.querySelector("td[data-x=\"".concat(currentLetter.x - _i2, "\"][data-y=\"").concat(currentLetter.y - _i2, "\"]")));
        }
      }

      return cellsInRange;
    }
  }, {
    key: "renderGrid",
    value: function renderGrid(wordGrid, gridSize) {
      var _this = this;

      var gridArea = document.getElementsByClassName("grid-area")[0]; //this remove last child

      if (gridArea.lastChild) {
        gridArea.removeChild(gridArea.lastChild);
      }

      this.gridArea = gridArea;
      var tbl = document.createElement("table");
      var tblBody = document.createElement("tbody");
      var index = 0;

      for (var i = 0; i < gridSize; i++) {
        var row = document.createElement("tr");

        for (var j = 0; j < gridSize; j++) {
          var cell = document.createElement("td");
          var letter = wordGrid[index++];
          var cellText = document.createTextNode(letter);
          cell.appendChild(cellText);
          cell.setAttribute("data-x", i);
          cell.setAttribute("data-y", j);
          cell.setAttribute("data-letter", letter);
          row.appendChild(cell);
        }

        tblBody.appendChild(row);
      }

      tbl.appendChild(tblBody);
      gridArea.appendChild(tbl); // tbl.setAttribute("border", "2");
      //Click Handlers

      tbl.addEventListener("mousedown", function (event) {
        _this.wordSelectMode = true;
        var cell = event.target;
        var x = cell.getAttribute("data-x");
        var y = cell.getAttribute("data-y");
        var letter = cell.getAttribute("data-letter"); // this.selectedItems.push({
        //     x, y, letter, cell
        // });

        _this.firstSelectedItem = {
          x: x,
          y: y,
          letter: letter,
          cell: cell
        }; //   this.selectedItems.push(this.firstSelectedItem);
      });
      tbl.addEventListener("mousemove", function (event) {
        console.log("move");

        if (_this.wordSelectMode) {
          var _cell = event.target; //event.target.classList.add("selected");

          var x = +_cell.getAttribute("data-x");
          var y = +_cell.getAttribute("data-y");
          console.log(x + " " + y);

          var _letter = _cell.getAttribute("data-letter"); //         if (this.selectedItems.length > 1) {
          //             const lastSelectedItem = this.selectedItems[this.selectedItems.length - 1];
          //             if (lastSelectedItem.x === x && lastSelectedItem.y === y) return;
          //         }
          //         this.selectedItems.push({
          //             x, y, letter, cell
          //        });


          _this.selectedItems.forEach(function (cell) {
            return cell.classList.remove("selected");
          });

          _this.selectedItems = _this.getCellsInRange(_this.firstSelectedItem, {
            x: x,
            y: y
          });
          console.log("Selected Items :" + _this.selectedItems);

          _this.selectedItems.forEach(function (cell) {
            return cell.classList.add("selected");
          });
        }
      });
      gridArea.addEventListener("mouseup", function (event) {
        _this.wordSelectMode = false;

        var selectedWord = _this.selectedItems.reduce(function (word, cell) {
          return word += cell.getAttribute("data-letter");
        }, '');

        console.log(_this.words);
        var reversedSelectedWord = selectedWord.split("").reverse().join("");

        if (_this.words.indexOf(selectedWord) != -1) {
          _this.foundWords.push(selectedWord);
        } else if (_this.words.indexOf(reversedSelectedWord) != -1) {
          _this.foundWords.push(reversedSelectedWord);
        } else {
          _this.selectedItems.forEach(function (item) {
            return item.classList.remove("selected");
          });
        }

        _this.selectedItems = [];
        console.log(_this.foundWords, selectedWord, reversedSelectedWord);
      });
    }
  }]);

  return Grid;
}();

var submitWordBtn = document.querySelector(".submit-word");
var GRID_SIZE = 10;
submitWordBtn.addEventListener("click", function _callee() {
  var grid, commaSeparatedWords, gridSize, result, wordListNode, wordListSection;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          grid = new Grid();
          commaSeparatedWords = document.querySelector("#add-word").value;
          gridSize = document.querySelector("#grid-size").value;
          _context.next = 5;
          return regeneratorRuntime.awrap(fetchGridInfo(gridSize, commaSeparatedWords));

        case 5:
          result = _context.sent;
          grid.words = commaSeparatedWords.split(",");
          grid.renderGrid(result, gridSize);
          wordListNode = document.createTextNode(grid.words);
          wordListSection = document.querySelector(".word-list");
          document.querySelector(".word-list").appendChild(wordListNode);

          if (wordListSection.lastChild) {
            wordListSection.removeChild(wordListSection.lastChild);
          }

          wordListSection.appendChild(wordListNode);
          console.log("Button clicked" + result);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  });
});

function fetchGridInfo(GRID_SIZE, commaSeparatedWords) {
  var response, result;
  return regeneratorRuntime.async(function fetchGridInfo$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(fetch("http://localhost:8089/grid?gridSize=".concat(GRID_SIZE, "&words=").concat(commaSeparatedWords)));

        case 2:
          response = _context2.sent;
          result = response.text();
          _context2.next = 6;
          return regeneratorRuntime.awrap(result);

        case 6:
          return _context2.abrupt("return", _context2.sent.split(" "));

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
}