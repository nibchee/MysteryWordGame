"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Grid = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Grid =
/*#__PURE__*/
function () {
  function Grid() {
    _classCallCheck(this, Grid);
  }

  _createClass(Grid, [{
    key: "renderGrid",
    value: function renderGrid(wordGrid, gridSize) {
      var gridArea = document.getElementsByClassName("grid-area")[0];
      var tbl = document.createElement("table");
      var tblBody = document.createElement("tbody");
      var index = 0;

      for (var i = 0; i < gridSize; i++) {
        var row = document.createElement("tr");

        for (var j = 0; j < gridSize; j++) {
          var cell = document.createElement("td");
          var cellText = document.createTextNode(wordGrid[index++]);
          cell.appendChild(cellText);
          row.appendChild(cell);
        }

        tblBody.appendChild(row);
      }

      tbl.appendChild(tblBody);
      gridArea.appendChild(tbl);
      tbl.setAttribute("border", "2");
    }
  }]);

  return Grid;
}();

exports.Grid = Grid;