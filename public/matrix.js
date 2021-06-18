//Matrix library
//Graham White
//Published: June 17 2021
class Matrix{
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = [];

        for (let i = 0; i < this.rows; i++) {
            this.data[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.data[i] = [];
                this.data[i][j] = 0;
            }
        }
    }

    //Randomize default values between -1 and 1
    randomize() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = Math.floor(Math.random() * 2  - 1);
            }
        }
    }


    add(n) {
        if (n instanceof Matrix) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] += n.data[i][j];
                }
            }
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] += n;
                }
            }
        }
    }

    subtract(n) {
        if (n instanceof Matrix) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] -= n.data[i][j];
                }
            }
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] -= n;
                }
            }
        }
    }

    transpose() {
        let result = new Matrix(this.cols, this.rows);

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                result.data[j][i] = this.data[i][j];
            }
        }
        return result;
    }

    //Apply any arbitrary function to every value in a matrix
    map(func) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let val = this.data[i][j];
                this.data[i][j] =func(val);
            }
        }
    }
    print() {
        console.table(this.data)
    }

    static fromArray(arr){
        let m = new Matrix(arr.length, 1);

        for (let i = 0; i < arr.length; i ++) {
            m.data[i][0] = arr[i];
        }
        return m;

    }

    toArray() {
        let arr = [];

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                arr.push(this.data[i][j]);
            }
        }

        return arr;
    }

    static multiply(a,b) {
        //matrix product


            if (a.cols !== b.rows) {
                console.error('Matrix A must have the same number of rows as Matrix B has columns')
                return undefined;
            }


            let result = new Matrix(a.rows, b.cols);

            for (let i = 0; i < result.rows; i++) {
                for (let j = 0; j < result.cols; j++) {

                    let sum = 0;

                    for (let k = 0; k < a.cols; k++) {
                        sum += a.matrix[i][k] * b.matrix[k][j];
                    }

                    result.data[i][j] = sum;
                }
            }

            return result;


    }


    multiply(n) {


        //Scalar product
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] *= n;
            }
        }

    }
}




