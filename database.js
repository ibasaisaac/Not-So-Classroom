import mysql from 'mysql';

// const cleardb = mysql.createConnection({
//     connectionaLimit: 50,
//     user: 'bc428ce5861a76',
//     host: 'us-cdbr-east-06.cleardb.net',
//     password: '38a4cf9f',
//     database: heroku_ebaddd48d7b073f,
//     port: 3306
// });

export var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'classroom'
});

connection.connect(function (error) {
    if (!!error) {
        console.log(error);
    } else {
        console.log('Database connected');
    }
});  