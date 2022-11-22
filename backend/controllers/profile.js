import { QueryTypes } from 'sequelize';
import db from '../config/database.js';
import User from "../models/userModel.js";
import Student from "../models/studentModel.js";
import cr from "../models/cr_verifyModel.js";


export const userprofile = async (req, res) => {
    try {
        const results = await db.query(
            "SELECT users.student_id, users.email, users.username, student_list.name from student_list JOIN users ON student_list.student_id = users.student_id", { type: QueryTypes.SELECT }
          );
            res.json(results);

    } catch (error) {
        console.log(error);
    }
}

export const roleVerification = async (req, res) => {
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