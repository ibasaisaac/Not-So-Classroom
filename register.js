import { connection, bcrypt, nodemailer } from './bundles.js';

//hashing
const salt = 10; //rounds the plaintex goes thru to hash

let id, email, username, password;

export var send_email_otp = function (request, response) {

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

export var verify_email_otp = function (req, res) {
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
        res.redirect('/verification_pop.html');
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
