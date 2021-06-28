

class nn {

    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }

    constructor(input_nodes, hidden_nodes, output_nodes) {
        this.inputNodes = input_nodes;
        this.hiddenNodes = hidden_nodes;
        this.outputNodes = output_nodes;

        this.weights_ih = new Matrix(this.hiddenNodes, this.inputNodes);
        this.weights_ho = new Matrix(this.outputNodes, this.hiddenNodes);
        this.weights_ih.randomize();
        this.weights_ho.randomize();

        this.bias_h = new Matrix(this.hiddenNodes, 1);
        this.bias_o = new Matrix(this.outputNodes, 1);

        this.bias_h.randomize();
        this.bias_o.randomize();

    }

    train(inputs, targets){
        let outputs = this.feedForward(inputs);

        //convert array to matrix array
        outputs = Matrix.fromArray(outputs);
        targets = Matrix.fromArray(targets);

        let output_errors = Matrix.subtract(targets, outputs);

        let who_t = Matrix.transpose(this.weights_ho);
        let hidden_errors = Matrix.multiply(who_t, output_errors);



        targets.print();
        outputs.print();
        output_errors.print();

        let inputs = Matrix.fromArray(inputs_garray);
        let inputs = Matrix.fromArray(inputs_garray);

    }

    feedForward(input_array) {


        // Generating the Hidden Outputs
        let inputs = Matrix.fromArray(input_array);
        let hidden = Matrix.multiply(this.weights_ih, inputs);
        hidden.add(this.bias_h);
        // activation function!
        hidden.map(this.sigmoid);

        // Generating the output's output!
        let output = Matrix.multiply(this.weights_ho, hidden);
        output.add(this.bias_o);
        output.map(this.sigmoid);

        // Sending back to the caller!
        return output.toArray();


    }


}
