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