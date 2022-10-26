import { session, connection, bcrypt, nodemailer } from './bundles.js';

// http://localhost:3000/auth
export var loginverify = function (request, response) {

    let email_input = request.body.email;
    let password_input = request.body.password;

    if (email_input && password_input) {
        connection.query('SELECT student_id, username, password FROM students WHERE email = ?', [email_input],
            (error, results) => {

                if (error) console.log(error);

                if (results.length > 0) {
                    bcrypt.compare(password_input, results[0].password, function (err, result) {
                        // request.session.loggedin = true;
                        // request.session.user = {
                        //     id: results[0].student_id,
                        //     username: results[0].username
                        // };
                        // response.send(request.session.user);
                        if (err) { console.log(err); }

                        if (result == true) {
                            console.log('Correct Password!');
                            response.redirect('./home.html');
                        }
                        else {
                            console.log('Incorrect Password!');
                            response.redirect('./login.html');
                        }
                    });
                }
                else {
                    console.log('Email doesnt exist');
                    response.redirect('./login.html');
                }
                // response.end();
            });
    }
    else {
        console.log('Please enter Email and Password!');
        response.redirect('./static/login.html');
    }

}

// var logout = (request,response) => {
//     request.session.destroy();
//     response.redirect('/');
// }

export var send_forget_otp = function (request, response) {

    id = request.body.id;
    email = request.body.email;
    username = request.body.username;
    password = request.body.password;

    transporter.sendMail(mailConfigurations, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // response.redirect('/verification_pop.html');
    });

}

export var verify_forget_otp = function (req, res) {
    if (req.body.otp == otp) {
        console.log("OTP verified");
        // var modal = document.getElementById("verificationModal");
        // modal.style.display = "none";

        bcrypt.hash(password, salt, function (err, hash) {
            connection.query('INSERT INTO students (student_id, email, username, password) VALUES (?, ?, ?, ?)', [id, email, username, hash],
                function (error, results, fields) {
                    if (error) {
                        console.log(error);
                    }
                    res.redirect('./login.html');
                });
        });

    }
    else {
        console.log("Wrong OTP");
        res.redirect('/forget_pop.html');
    }
}


var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);

const mailConfigurations = {

    from: 'isaba190041223@gmail.com',
    to: 'ummetasnim@iut-dhaka.edu',
    // to: email,

    subject: 'Verify Email Address for Not So Classroom',
    text: `Hey!
    Thanks for registering for an account on Not So Classroom! 
    Before we get started, we just need to confirm that this is you. 
    Here's your code: ${otp} `
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
