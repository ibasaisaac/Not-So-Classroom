const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
var connection = require('./database');
const express = require('express');

const app = express();

//hashing
const bcrypt = require('bcrypt');
const saltRounds = 10; //rounds the plaintex goes thru to hash

let id, email, username, password;


var registerverify1 = function (request, response) {
    id = request.body.inputstid;
    email = request.body.inputemail;
    username = request.body.inputusername;
    password = request.body.inputpassword;

    transporter.sendMail(mailConfigurations, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        response.redirect('/verification_pop.html');
    });

}



var registerverify2 = function (req, res) {

    if (req.body.otp == otp) {
        res.send("You have been successfully registered");

        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                connection.query('INSERT INTO students (id, email, username, password) VALUES (?, ?, ?, ?)', [id, email, username, hash], 
                function (error, results, fields) {
                    // If there is an issue with the query, output the error
                    if (error) 
                        throw error;
                    // Redirect to home page

                    res.redirect('/login.html');
                    res.end();

                });
            });
        });

    }
    else {
        res.redirect('/verification_pop.html');
        // res.render('verification_pop.html', { msg: 'otp is incorrect' });
    }
}

var registerverify3 = function (req, res) {

    transporter.sendMail(mailConfigurations, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.redirect('/verification_pop.html'); 
        //res.render('verification_pop.html', { msg: "otp has been sent" });
    });
}






var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
const mailConfigurations = {

    from: 'isaba190041223@gmail.com',
    to: 'isabaishrak@iut-dhaka.edu',
   // to: email,

    subject: 'Verify Email Address for Not So Classroom',
    html: "<h3>Hey!Thanks for registering for an account on Not So Classroom! Before we get started, we just need to confirm that this is you. Here's your code:</h3>" +"<h1>"+otp+"</h1>"

    // text: `Hey!
    // Thanks for registering for an account on Not So Classroom! 
    // Before we get started, we just need to confirm that this is you. 
    // Here's your code: ${otp} `
};
const transporter = nodemailer.createTransport({
    // host: "smtp.gmail.com",
    // port: 465,
    // secure: true,
    service: 'gmail',
    auth: {
        user: 'isaba190041223@gmail.com',
        pass: 'gepalrtinqthiwbd'
    }
    
});


// const token = jwt.sign({
//     data: 'Token Data'
// }, 'ourSecretKey', { expiresIn: '10m' }
// );

module.exports = { registerverify1, registerverify2, registerverify3 } 