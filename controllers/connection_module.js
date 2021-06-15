var mysql = require('mysql')

//Database connection data - SECRET MOVE TO .ENV!!!
var connection = mysql.createConnection({
    host: 'dev-db.cswbmsct5zbp.ca-central-1.rds.amazonaws.com',
    user: 'admin',
    password: 'AlphaAlpha1',
    database: 'user'
})


//Test connection to SQL database
function establish_connection() {

    connection.query('SELECT 1 AS test_value', function (err, rows, fields) {
        if (err) throw err

        console.log('SQL Connection Succeeded');
    })
}


async function fetch_user_data() {


     await connection.query('SELECT * FROM user.usernames', function (err, rows, fields) {
        if (err) throw err;
        return rows;

    });
}

exports.fetch_user_data = fetch_user_data;
exports.establish_connection = establish_connection;
