import User from "../models/userModel.js";
import Student from "../models/studentModel.js";
import Group from "../models/groupModel.js";
import nodemailer from 'nodemailer';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

let id, email, username, password;
let currentUser = {
    student_id: '',
    email: '',
    username: '',
    dp: '',
    role: '',
    class_group: ''
}


export async function storeUser (id, email, username, dp, group, role) {
    currentUser.student_id = id;
    currentUser.email = email;
    currentUser.username = username;
    currentUser.dp = dp;
    const t = await Group.findOne({
        attributes: ['group_id', 'group_name'],
        where: {
            group_id: group
        }
    });
    t ? currentUser.class_group = {id: t.group_id, name: t.group_name}:{id: 0, name: ''}
    currentUser.role = role;
}

export const getUser = async (req, res) => {
    res.json(currentUser);
}


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
    }

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
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 //1 day
        });
    }
    else {
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
        });
    }

    return res.json({ accessToken }); //send accessToken as json object
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await User.findAll({ //SELECT * FROM ... WHERE refresh_token=refreshToken
        where: {
            refresh_token: refreshToken
        }
    });
    if (!user[0]) return res.sendStatus(204); //no content
    const userId = user[0].student_id;
    await User.update({ refresh_token: null }, { //UPDATE ... set refresh_token=null where id=userId
        where: {
            student_id: userId
        }
    });
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
    const mailConfigurations = make_mailConfig(email);

    console.log("sending email");
    console.log(mailConfigurations);
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailConfigurations, (error, info) => {
            if (error) {
                console.log(error)
                reject(400);
            }
            console.log('Message sent: %s', info.messageId);
            setTimeout(destroyOTP, 5 * 60 * 1000);
            resolve(200);
        });
    })
}

export const Forget = async (req, res) => {
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

export const createGroup = async (req, res) => {
    generateOTP();
    console.log(otp);
    try {
        await Group.create({
            group_code: otp,
            group_name: req.body.name,
            dept: req.body.dept,
            prog: req.body.prog,
            batch: req.body.batch,
            section: req.body.section,
            student_count: req.body.count
        })
            .then(function (response) {
                const newGroupId = response.group_id
                User.update({
                    class_group: newGroupId
                }, {
                    where: {
                        student_id: req.body.cr_id
                    }
                })
                    .then(function () {
                        return res.status(200).json(otp);
                    })
            })
    }
    catch (error) {
        console.log(error)
        return res.status(402).json({msg: 'This group already exists!'});
    }
}


export const joinGroup = async (req, res) => {
    try {
        await Group.findOne({
            attributes: ['group_id'],
            where: {
                group_code: req.body.code
            }
        })
            .then(function (response) {

                if (!response) {
                    return res.status(402).json({ msg: "Incorrect code" });
                }

                User.update({
                    class_group: response.group_id
                }, {
                    where: {
                        student_id: req.body.student_id
                    }
                })
                    .then(function () {
                        return res.status(200).json({ msg: "success" });
                    })
            })
    }
    catch (error) { console.log(error) }
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
        from: 'not.so.classroom@gmail.com',
        to: `${email}`,

        subject: 'Verify Email Address for Not So Classroom',
        text: `Thanks for registering for an account on Not So Classroom! Before we get started, we just need to confirm that this is you. Here's your code: ${otp}. This code will expire in 5 minutes.`
    };
}
const transporter = nodemailer.createTransport({
    // host: "smtp.gmail.com",
    // port: 465,
    // secure: true,
    service: 'gmail',
    auth: {
        user: 'not.so.classroom@gmail.com',
        pass: 'swgwrjysutrczavs'
    }
});
