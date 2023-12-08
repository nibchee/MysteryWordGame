export class Grid {
  renderGrid(wordGrid, gridSize) {
    var gridArea = document.getElementsByClassName("grid-area")[0];

    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");
    let index = 0;
    for (let i = 0; i < gridSize; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < gridSize; j++) {
        const cell = document.createElement("td");
        const cellText = document.createTextNode(wordGrid[index++]);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
      tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    gridArea.appendChild(tbl);
    tbl.setAttribute("border", "2");
  }
}