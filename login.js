var connection = require('./database');

// http://localhost:3000/auth
var loginverify = function (request, response) {

    // Capture the input fields
    let email = request.body.email;
    let password = request.body.password;

    // Ensure the input fields exists and are not empty
    if (email && password) {
        // Execute SQL query that'll select the account from the database based on the specified email and password
        connection.query('SELECT * FROM students WHERE email = ? AND password = ?', [email, password], function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (results.length > 0) {
                // Authenticate the user
                request.session.loggedin = true;
                request.session.userid = email;
                console.log(request.session);
                // Redirect to home page
                response.redirect('/home.html');
            } else {
                response.send('Incorrect Email and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Email and Password!');
        response.end();
    }
}

// var logout = (request,response) => {
//     request.session.destroy();
//     response.redirect('/');
// }

module.exports = { loginverify } 