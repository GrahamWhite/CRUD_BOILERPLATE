//Matrix library
//Graham White
//June 17 2021


    function Matrix(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.matrix = [];

        for (let i = 0; i < this.rows; i++) {
            this.matrix[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.matrix[i] = [];
                this.matrix[i][j] = 0;
            }
        }

        Matrix.prototype.randomize = function() {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.matrix[i][j] = Math.floor(Math.random() * 10);
                }
            }
        }

        Matrix.prototype.add = function(n) {
            if(n instanceof Matrix) {
                for (let i = 0; i < this.rows; i++) {
                    for (let j = 0; j < this.cols; j++) {
                        this.matrix[i][j] += n.matrix[i][j];
                    }
                }
            } else {
                for (let i = 0; i < this.rows; i++) {
                    for (let j = 0; j < this.cols; j++) {
                        this.matrix[i][j] += n;
                    }
                }
            }
        }

        Matrix.prototype.subtract = function(n) {
            if(n instanceof Matrix) {
                for (let i = 0; i < this.rows; i++) {
                    for (let j = 0; j < this.cols; j++) {
                        this.matrix[i][j] -= n.matrix[i][j];
                    }
                }
            } else {
                for (let i = 0; i < this.rows; i++) {
                    for (let j = 0; j < this.cols; j++) {
                        this.matrix[i][j] -= n;
                    }
                }
            }
        }

        Matrix.prototype.transpose = function () {
            let result = new Matrix(this.cols, this.rows);

            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    result.matrix[j][i] = this.matrix[i][j];
                }
            }
            return result;
        }


        Matrix.prototype.multiply = function (n) {
            //matrix product
            if(n instanceof Matrix) {

                if(this.cols !== n.rows){
                    console.error('Matrix A must have the same number of rows as Matrix B has columns')
                    return undefined;
                }


                let result = new Matrix(this.rows, n.cols);
                let a = this;
                let b = n;
                for (let i = 0; i < result.rows; i++) {
                    for (let j = 0; j < result.cols; j++) {

                        let sum = 0;

                        for (let k =0; k < a.cols; k++){
                           sum += a.matrix[i][k] * b.matrix[k][j];
                        }

                        result.matrix[i][j] = sum;
                    }
                }

                return result;

            } else {

                //Scalar product
                for (let i = 0; i < this.rows; i++) {
                    for (let j = 0; j < this.cols; j++) {
                        this.matrix[i][j] *= n;
                    }
                }
            }
        }
}

