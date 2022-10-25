var connection = require('./database');

//hashing
const bcrypt = require('bcrypt');
const saltRounds = 10; //rounds the plaintex goes thru to hash

// http://localhost:3000/auth
var loginverify = function (request, response) {

    // Capture the input fields
    let email = request.body.email;
    let mypassword = request.body.password;
    

    // Ensure the input fields exists and are not empty
    if (email && mypassword) {
        // Execute SQL query that'll select the account from the database based on the specified email and password
        connection.query('SELECT password FROM students WHERE email = ? LIMIT 1', [email], 
         (error, results, fields)=> {

            // If there is an issue with the query, output the error
            if (error) throw error;

            // If the account exists
            if (results.length > 0) {

                //hash check
                //const passcheck = bcrypt.compare(mypassword,hashedpassword);
                if(bcrypt.compare(mypassword,results[0].password)){
                    // Authenticate the user
                    request.session.loggedin = true;
                    request.session.userid = email;
                    console.log(request.session);
                    // Redirect to home page
                    response.redirect('/home.html');
                }
            } else {
                response.send('Incorrect Email and/or Password!');
                response.redirect('/login.html');
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