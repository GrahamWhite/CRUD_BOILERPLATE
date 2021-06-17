

class Neural_Network {

    constructor(n,c){

        console.log('initializing network')
        this.weights = [];

        //Initialize random weights
        for(let i = 0; i < n; i++){
            this.weights[i] = Math.random() * (2) - 1;
        }
        this.c = c;
    }





    activate(sum){
        if(sum > 0) return 1;
        else return -1;
    }

    getWeights(){
        return this.weights;
    }

    feedForward(inputs){
        let sum = 0;
        for(let i = 0; i < this.weights.length; i++){
            sum += inputs[i] * this.weights[i];
        }

        return this.activate(sum);
    }

    train(inputs, desired){
        let guess = this.feedForward(inputs);
        let error = desired - guess;
        for(let i = 0; i < this.weights.length; i++){
            this.weights[i] +=this.c * error * inputs[i];
        }
    }
}


// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Simple Perceptron Example
// See: http://en.wikipedia.org/wiki/Perceptron

// Code based on text "Artificial Intelligence", George Luger

// A list of points we will use to "train" the perceptron
let training = new Array(500);

// A Perceptron object
let ptron;

// We will train the perceptron with one "Point" object at a time
let count = 0;

// Coordinate space
let xmin = -1;
let ymin = -1;
let xmax = 1;
let ymax = 1;

let currentSlope;
let currentDeviation;
let desiredSlope = document.getElementById('slope').value;
let learningRate = document.getElementById('learningRate').value;
let button = document.getElementById('applyChanges');
button.addEventListener('click', updateValues);

function updateValues(){
    desiredSlope = document.getElementById('slope').value;
    learningRate = document.getElementById('learningRate').value;
    setup();
}

// The function to describe a line
function f(x) {
    let y = desiredSlope * x;
    return y;
}

function setup() {
    createCanvas(1000, 1000);

    // The perceptron has 3 inputs -- x, y, and bias
    // Second value is "Learning Constant"
    ptron = new Neural_Network(3, .01); // Learning Constant is low just b/c it's fun to watch, this is not necessarily optimal



    // Create a random set of training points and calculate the "known" answer
    for (let i = 0; i < training.length; i++) {
        let x = random(xmin, xmax);
        let y = random(ymin, ymax);
        let answer = 1;
        if (y < f(x)) answer = -1;
        training[i] = {
            input: [x, y, 1],
            output: answer
        };
    }
}



function draw() {
    background(0);

    // Draw the line
    strokeWeight(2);
    stroke(255);
    let x1 = map(xmin, xmin, xmax, 0, width);
    let y1 = map(f(xmin), ymin, ymax, height, 0);
    let x2 = map(xmax, xmin, xmax, 0, width);
    let y2 = map(f(xmax), ymin, ymax, height, 0);
    line(x1, y1, x2, y2);

    // Draw the line based on the current weights
    // Formula is weights[0]*x + weights[1]*y + weights[2] = 0
    stroke(255);
    strokeWeight(4);
    let weights = ptron.getWeights();
    x1 = xmin;
    y1 = (-weights[2] - weights[0] * x1) / weights[1];
    x2 = xmax;
    y2 = (-weights[2] - weights[0] * x2) / weights[1];

    x1 = map(x1, xmin, xmax, 0, width);
    y1 = map(y1, ymin, ymax, height, 0);
    x2 = map(x2, xmin, xmax, 0, width);
    y2 = map(y2, ymin, ymax, height, 0);
    line(x1, y1, x2, y2);

    currentSlope = (y2 / y1);
    currentDeviation = (currentSlope / desiredSlope).toPrecision(2) ;




    // Train the Perceptron with one "training" point at a time
    ptron.train(training[count].input, training[count].output);
    count = (count + 1) % training.length;

    // Draw all the points based on what the Perceptron would "guess"
    // Does not use the "known" correct answer
    for (let i = 0; i < count; i++) {
        stroke(255);
        strokeWeight(1);
        fill(255);
        let guess = ptron.feedForward(training[i].input);
        if (guess > 0) noFill();



        let x = map(training[i].input[0], xmin, xmax, 0, width);
        let y = map(training[i].input[1], ymin, ymax, height, 0);
        ellipse(x, y, 8, 8);



    }

    document.getElementById('currentGuess').innerText = 'Current Slope: ' + currentSlope.toPrecision(2);
    document.getElementById('currentDeviation').innerText = 'Current Deviation: ' + currentDeviation + ' %';


}

