class Tile {
    constructor(index) {
        this.index = index;
        this.x = index % 9;
        this.y = Math.trunc(index / 9);
        this.value = 0;
        this.mutable = true;
        this.isHighlighted = false;
    }

    render() {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x * cellSize, this.y * cellSize, cellSize, cellSize);

        if (!this.mutable) {
            ctx.fillStyle = "#afeeee";
            ctx.fillRect(this.x * cellSize, this.y * cellSize, cellSize, cellSize);
        }
        if (this.isHighlighted) {
            ctx.fillStyle = "#00ff00";
            ctx.fillRect(this.x * cellSize, this.y * cellSize, cellSize, cellSize);
        }
        if (this.index == selectedIndex) {
            ctx.fillStyle = "#ff0000";
            ctx.fillRect(this.x * cellSize, this.y * cellSize, cellSize, cellSize);
        }
        ctx.font = "60px Verdana";
        ctx.textAlign = "center";
        ctx.fillStyle = "#000000";
        if (this.value != 0) {
            ctx.fillText(this.value, (this.x * cellSize) + (cellSize * 0.5), (this.y * cellSize) + (cellSize * 0.75));
        }
    }
}
