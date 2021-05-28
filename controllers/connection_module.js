var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'dev-db.cswbmsct5zbp.ca-central-1.rds.amazonaws.com',
    user: 'admin',
    password: 'AlphaAlpha1',
    database: 'user'
})


function establish_connection() {


    connection.connect()

    connection.query('SELECT 1 AS test_value', function (err, rows, fields) {
        if (err) throw err

        console.log('SQL Connection Succeeded');
    })

    connection.end()
}


exports.establish_connection = establish_connection;
