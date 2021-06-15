


//This module is intended as a workspace for modules in development
//June 13 2021

let bcrypt = require('bcrypt');
let userData = [];
let connection = require('./connection_module');
let p5 = require('react-p5');



function test_module() {
    console.log(`Initializing test module...`);
    DrawCanvas();
}

function login(username, password){
    console.log('Attempting to login ' + username)

}


let w = 400;
let h = 400;
const resolution = 10;



let grid;
let cols;
let rows;

function setup() {
    createCanvas(w, h);

    cols = w / resolution;
    rows = h / resolution;

    console.log(cols, rows);

    grid = make2DArray(cols, rows);

    console.log(grid);

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
    background(110);

    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            let x = i * resolution;
            let y = j * resolution;

            if(grid[i][j] == 1)
                rect(x,y, resolution, resolution)
        }
    }
}



function init(){
    let userModel = {
        username: "graham",
        password: "password",
        dateAdded: Date.now(),
        isAdmin: true,
        isActive: true
    }

    userData.push(userModel);
}

exports.init = test_module;
exports.setup = setup();