import { connection, bcrypt, nodemailer } from './bundles.js';

//hashing
const salt = 10; //rounds the plaintex goes thru to hash

var id_input, email_input, username_input, password_input;

export var validate_register_form = function (request, response) {
    id_input = request.body.id;
    email_input = request.body.email + "@iut-dhaka.edu";
    username_input = request.body.username;
    password_input = request.body.password;

    connection.query('SELECT student_id FROM student_list WHERE student_id = ?', [id_input],
        (error, results) => {
            if (error) console.log(error);

            if (results.length > 0) {
                connection.query('SELECT student_id FROM accounts WHERE student_id = ?', [id_input],
                    (error, results) => {
                        if (error) console.log(error);

                        if (results.length > 0) {
                            console.log('Already registered!');
                            response.sendFile('./static/register.html', { root: '.' });
                        }
                        else {
                            connection.query('SELECT student_id FROM accounts WHERE email = ?', [email_input],
                                (error, results) => {
                                    if (error) console.log(error);

                                    if (results.length > 0) {
                                        console.log('Email is already registered!');
                                        response.sendFile('./static/register.html', { root: '.' });
                                    }
                                    else {
                                        connection.query('SELECT student_id FROM accounts WHERE username = ?', [username_input],
                                            (error, results) => {
                                                if (error) console.log(error);

                                                if (results.length > 0) {
                                                    console.log('Username taken!');
                                                    response.sendFile('./static/register.html', { root: '.' });
                                                }
                                                else {
                                                    send_email_otp;
                                                }
                                            });
                                    }
                                });
                        }
                    });
            }
            else {
                console.log('No such ID');
                response.sendFile('./static/register.html', { root: '.' });
            }
        });
}

export var send_email_otp = function (request, response) {

    generateOTP();
    const mailConfigurations = make_mailConfig(email_input);

    transporter.sendMail(mailConfigurations, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        setTimeout(destroyOTP, 60000);
    });
}

export var verify_email_otp = function (req, res) {
    if (req.body.otp == otp) {
        console.log("OTP verified");
        destroyOTP();

        bcrypt.hash(password_input, salt, function (err, hash) {
            connection.query('INSERT INTO accounts (student_id, email, username, password) VALUES (?, ?, ?, ?)', [id_input, email_input, username_input, hash],
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


var otp;
function generateOTP() {
    otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);
}

function destroyOTP() {
    otp = null;
    console.log('OTP expired');
}

function make_mailConfig(email) {
    return {
        from: 'isaba190041223@gmail.com',
        to: `${email}`,

        subject: 'Verify Email Address for Not So Classroom',
        text: `Thanks for registering for an account on Not So Classroom! Before we get started, we just need to confirm that this is you. Here's your code: ${otp}`
    };
}
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
