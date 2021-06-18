

class nn {

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

        this.weights_ih.print();
        this.weights_ho.print();


    }

    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }

    feedForward(input_array) {

        let inputs = Matrix.fromArray(input_array);

        let hidden = Matrix.multiply(this.weights_ih, inputs);

        //activation function
        hidden.add(this.bias_h);
        hidden.map(this.sigmoid);
        let output = Matrix.multiply(this.weights_ho, hidden);
        output.add(this.bias_o);
        output.map(this.sigmoid);


        return output.toArray();
    }
}