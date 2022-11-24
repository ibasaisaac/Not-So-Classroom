import { QueryTypes } from 'sequelize';
import db from '../config/database.js';
import User from "../models/userModel.js";
import Student from "../models/studentModel.js";
import Role from "../models/role_verifyModel.js";
import { response } from 'express';


export const userprofile = async (req, res) => {
    
}

export const CR_verification = async (req, res) =>{
    try {
        await Role.findOne({
            attributes: ['role'],
            where: {
                student_id: req.body.id
            }
        })
            .then(function (response) {

                if (!response) {
                    return res.status(402).json({ msg: "Not cr or club moderator" });
                }

                User.update({
                    role: response.role
                }, {
                    where: {
                        student_id: req.body.id
                    }
                })
                    .then(function () {
                        return res.status(200).json({ msg: "success" });
                    })
            })
            
    }
    catch (error) { console.log(error) }
}



