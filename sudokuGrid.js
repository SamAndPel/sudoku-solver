class SudokuGrid {
    constructor() {
        this.data = [];
        for (var i = 0; i < 81; i++) {
            this.data.push(new Tile(i));
        }
    }

    isValid() {
        for (var i = 0; i < 9; i++) {
            var rowHas = [];
            for (var j = 0; j < 9; j++) {
                var val = this.data[getIndex(j, i)].value;
                if (val != 0 && rowHas.includes(val)) {
                    // console.log("[-] Duplicate " + val + " in row " + i + " - invalid");
                    return false;
                } else {
                    rowHas.push(val);
                }
            }
        }
        for (var i = 0; i < 9; i++) {
            var columnHas = [];
            for (var j = 0; j < 9; j++) {
                var val = this.data[getIndex(i, j)].value;
                if (val != 0 && columnHas.includes(val)) {
                    // console.log("[-] Duplicate " + val + " in column " + i + " - invalid");
                    return false;
                } else {
                    columnHas.push(val);
                }
            }
        }
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var topleftx = j * 3;
                var toplefty = i * 3;
                var boxHas = [];

                var val = this.data[getIndex(topleftx, toplefty)].value;
                if (val != 0 && boxHas.includes(val)) {
                    // console.log("[-] Duplicate " + val + " in box " + i + ", " + j + " - invalid");
                    return false;
                } else {
                    boxHas.push(val);
                }
                var val = this.data[getIndex(topleftx + 1, toplefty)].value;
                if (val != 0 && boxHas.includes(val)) {
                    // console.log("[-] Duplicate " + val + " in box " + i + ", " + j + " - invalid");
                    return false;
                } else {
                    boxHas.push(val);
                }
                var val = this.data[getIndex(topleftx + 2, toplefty)].value;
                if (val != 0 && boxHas.includes(val)) {
                    // console.log("[-] Duplicate " + val + " in box " + i + ", " + j + " - invalid");
                    return false;
                } else {
                    boxHas.push(val);
                }
                var val = this.data[getIndex(topleftx, toplefty + 1)].value;
                if (val != 0 && boxHas.includes(val)) {
                    // console.log("[-] Duplicate " + val + " in box " + i + ", " + j + " - invalid");
                    return false;
                } else {
                    boxHas.push(val);
                }
                var val = this.data[getIndex(topleftx + 1, toplefty + 1)].value;
                if (val != 0 && boxHas.includes(val)) {
                    // console.log("[-] Duplicate " + val + " in box " + i + ", " + j + " - invalid");
                    return false;
                } else {
                    boxHas.push(val);
                }
                var val = this.data[getIndex(topleftx + 2, toplefty + 1)].value;
                if (val != 0 && boxHas.includes(val)) {
                    // console.log("[-] Duplicate " + val + " in box " + i + ", " + j + " - invalid");
                    return false;
                } else {
                    boxHas.push(val);
                }
                var val = this.data[getIndex(topleftx, toplefty + 2)].value;
                if (val != 0 && boxHas.includes(val)) {
                    // console.log("[-] Duplicate " + val + " in box " + i + ", " + j + " - invalid");
                    return false;
                } else {
                    boxHas.push(val);
                }
                var val = this.data[getIndex(topleftx + 1, toplefty + 2)].value;
                if (val != 0 && boxHas.includes(val)) {
                    // console.log("[-] Duplicate " + val + " in box " + i + ", " + j + " - invalid");
                    return false;
                } else {
                    boxHas.push(val);
                }
                var val = this.data[getIndex(topleftx + 2, toplefty + 2)].value;
                if (val != 0 && boxHas.includes(val)) {
                    // console.log("[-] Duplicate " + val + " in box " + i + ", " + j + " - invalid");
                    return false;
                } else {
                    boxHas.push(val);
                }
            }
        }

        // console.log("[+] Valid sudoku");
        return true;
    }

    render() {
        // Render each cell
        for (var i = 0; i < this.data.length; i++) {
            this.data[i].render();
        }

        // Draw the 9x9 grid
        ctx.beginPath();
        for (var i = 0; i <= 9; i++) {
            ctx.moveTo(i * cellSize, 0);
            ctx.lineTo(i * cellSize, canv.height);
        }
        for (var i = 0; i <= 9; i++) {
            ctx.moveTo(0, i * cellSize);
            ctx.lineTo(canv.width, i * cellSize);
        }
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw the 3x3 bold grid
        ctx.beginPath();
        for (var i = 0; i <= 3; i++) {
            ctx.moveTo(i * cellSize * 3, 0);
            ctx.lineTo(i * cellSize * 3, canv.height);
        }
        for (var i = 0; i <= 3; i++) {
            ctx.moveTo(0, i * cellSize * 3);
            ctx.lineTo(canv.width, i * cellSize * 3);
        }
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 3;
        ctx.stroke();
    }
}
