import User from "../models/userModel.js";
import Student from "../models/studentModel.js";
import nodemailer from 'nodemailer';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// export const getUser = async (req, res) => {
//     try {
//         const user = await User.findOne({ //same as SELECT id, name, email FROM ...
//             attributes: ['id', 'username', 'email'],
//             where: {
//                 email: req.body.email
//             }
//         });
//         res.json(user); //send the users object as json object
//     } catch (error) {
//         console.log(error);
//     }
// }
let id, email, username, password;
export const Register = async (req, res) => {

    const student = await Student.findOne({
        // attributes: ['student_id', 'name'],
        where: {
            student_id: req.body.id
        }
    });
    if (!student) {
        return res.status(404).json({ msg: "No such ID!" });
    }

    var user = await User.findAll({
        attributes: ['username'],
        where: {
            student_id: req.body.id
        }
    });
    if (user[0])
        return res.status(400).json({ msg: "Already registered" });
    user = await User.findAll({
        attributes: ['username'],
        where: {
            email: req.body.email
        }
    });
    if (user[0])
        return res.status(402).json({ msg: "Already registered" });

    user = await User.findAll({
        attributes: ['student_id'],
        where: {
            username: req.body.username
        }
    });
    if (user[0]) {
        return res.status(401).json({ msg: "Username already taken" });
    }

    id = req.body.id;
    email = req.body.email;
    username = req.body.username;
    password = req.body.password;
    return res.status(await SendOTP()).json({ msg: "OTP sent successfully" });
}

export const Login = async (req, res) => { //check pass, sign tokens and update in db, send cookie, send accesstoken

    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!user) {
        return res.status(404).json({ msg: "Email not found" });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
        return res.status(400).json({ msg: "Incorrect password" });
    }//send message string as json object and RETURN

    const userId = user.student_id;
    const username = user.username;
    const email = user.email;

    //data to hash in token secret, token secret, token expiry time  
    //token secrets stored in .env, to use them needed dotenv
    const accessToken = jwt.sign({ userId, username, email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15s'
    }); //new access token everytime browser is closed



    const refreshToken = jwt.sign({ userId, username, email }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1d'
    }); //after 1 day user have to log in again
    await User.update({ refresh_token: refreshToken }, {
        where: {
            student_id: userId
        }
    });

    if (req.body.remember) {
        res.cookie('refreshToken', refreshToken, { //send a cookie to the user
            //this cookie is a identifier of the user sent by the server the first time the user logs in to the website.
            // saved in browser and sent to the server everytime user revisits the website and 
            //server will identify the user from this and user wont have to log in again
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
    }
    else {
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            expiresIn: 0
        });
    }
    return res.json({ accessToken }); //send accessToken as json object
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    // if (!refreshToken) return res.sendStatus(204);
    // const user = await User.findAll({ //SELECT * FROM ... WHERE refresh_token=refreshToken
    //     where: {
    //         refresh_token: refreshToken
    //     }
    // });
    // if (!user[0]) return res.sendStatus(204); //no content
    // const userId = user[0].id;
    // await User.update({ refresh_token: null }, { //UPDATE ... set refresh_token=null where id=userId
    //     where: {
    //         id: userId
    //     }
    // });
    res.clearCookie('refreshToken'); //deleting cookie
    return res.sendStatus(200); //ok
}

export const Verification = async (req, res) => {
    if (req.body.otp == otp) {
        destroyOTP();

        const user = await User.findOne({
            attributes: ['username'],
            where: {
                email: email
            }
        });
        if (!user) {
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);
            await User.create({
                student_id: id,
                email: email,
                username: username,
                password: hashPassword
            });
        }
        else {
            const salt = await bcrypt.genSalt();
            console
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            await User.update({
                password: hashPassword
            }, {
                where: {
                    email: email
                }
            });
        }

        console.log("success");
        res.status(200).json({ msg: "OTP verified" });
        // res.status(200).json({ msg: "Registration Successful" }); 
    }
    else if (otp == null) {
        res.status(402).json({ msg: "OTP expired" });
    }
    else {
        res.status(402).json({ msg: "Wrong OTP" });
    }
}

export const Resend = async (req, res) => {
    return res.status(await SendOTP()).json({ msg: "OTP sent successfully" });
}
const SendOTP = async () => {
    generateOTP();
    setTimeout(destroyOTP, 60000);
    const mailConfigurations = make_mailConfig(email);
    console.log(mailConfigurations);
    return 200;

    // return new Promise((resolve, reject) => {
    //     transporter.sendMail(mailConfigurations, (error, info) => {
    //         if (error) {
    //             console.log(error)
    //             reject(400);
    //         }
    //         console.log('Message sent: %s', info.messageId);
    //         setTimeout(destroyOTP, 60000);
    //         resolve(200);
    //     });
    // })
}

export const Forget = async (req, res) => {
    console.log("here");
    const user = await User.findOne({
        attributes: ['username'],
        where: {
            email: req.body.email
        }
    });
    if (!user)
        return res.status(402).json({ msg: "Email doesn't exist!" });
    else {
        email = req.body.email;
        return res.status(await SendOTP()).json({ msg: "OTP sent successfully" });
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
        text: `Thanks for registering for an account on Not So Classroom! Before we get started, we just need to confirm that this is you. Here's your code: ${otp}. This code will expire in 1 minute.`
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
