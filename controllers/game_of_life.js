let p5 = require('p5');

let w = 1000;
let h = 1000;
const resolution = 5;

let grid;
let cols;
let rows;

function setup() {
    createCanvas(w, h);

    cols = w / resolution;
    rows = h / resolution;
    grid = make2DArray(cols, rows);

    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            grid[i][j] = floor(random(2));
        }
    }
}

function make2DArray(cols, rows){
    let arr = new Array(cols);
    for(let i = 0; i < arr.length; i++){
        arr[i] = new Array(rows);
    }
    return arr;
}



function draw() {
    background(240);
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            let x = i * resolution;
            let y = j * resolution;

            if(grid[i][j] == 1)  {
                fill(255);
                stroke(0);
                rect(x,y, resolution, resolution);
            }
        }
    }

    let next = make2DArray(cols, rows);

    //compute next based on grid

    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){


            let state = grid[i][j];

            if(i == 0 || i == cols - 1 || j == 0 || j == rows - 1){
                next[i][j] = state;
            }

            let sum = 0;
            let neighbors = countNeighbors(grid, i, j);

            if(state == 0 && neighbors == 3) {
                next[i][j] = 1;
            } else if(state == 1 && (neighbors < 2 || neighbors > 3)){
                next[i][j] = 0;
            } else {
                next[i][j] = state;
            }


        }
    }
    grid = next;

}

function countNeighbors(grid, x, y){
    let sum = 0;

    for(let i = -1; i < 2; i++){
        for(let j = -1; j < 2; j++){

            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;

            //console.log(col + ' ' + row + ' ' + grid[col][row])

            sum += grid[col][row];
        }
    }

    sum -= grid[x][y];
    return sum;
}