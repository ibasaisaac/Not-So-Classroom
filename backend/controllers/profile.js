import { QueryTypes } from 'sequelize';
import db from '../config/database.js';
import User from "../models/userModel.js";
import Student from "../models/studentModel.js";
import Role from "../models/role_verifyModel.js";
import Event from "../models/eventModel.js";
import { response } from 'express';
import multer from 'multer';


export const userprofile = async (req, res) => {
    
}

const imgconfig = multer.diskStorage({
    destination: (req, file, callBack)=> {
      callBack(null, 'uploads/')
    },
    filename: (req, file, callBack) => {
    //   callBack(null, Date.now() + '-' + file.originalname)
    callBack(null, Date.now() + '-' + 'profile-' + file.originalname)
    }
  })

const upload = multer({ storage: imgconfig }).single('photo')


export const changedp = async (req, res) => {
  let filename;

  upload(req, res, (err) => {
    if (err) {
      console.log(err)
    }
    else {

      if (req.file == undefined) {
        filename = '';
        console.log('here')
      }
      else {
        filename = 'http://localhost:5000/uploads/' + req.file.filename;
      }

      try {
        console.log(filename)
            User.update({
              dp: filename
          }, {
              where: {
                  student_id: req.body.op_id
              }
          })
              .then(function () {
                  return res.status(200).json({ msg: "success" });
              })
          } catch (error) {
            res.status(422).json({status: 422, error})
          }
    }
  })
}

export const showdp  = async (req, res) => {
  try {
    const results = await User.findOne({
      attributes: ['dp'],
      where: {
        student_id: req.body.id
      }
    });
    res.json(results);
  } catch (error) {
    console.log(error);
  }
}


export const createEvent = async (req, res) => {
    var newEventID
    try {
        await Event.create({
            date: req.body.date,
            time: req.body.time,
            place: req.body.place,
            room: req.body.room,
            category: req.body.category,
            //group_id: ,
            //club_id: ,
            details: req.body.details,
            student_id: req.body.student_id
        })
        .then(function (response) {
            newEventID = response.null
          })
          const newEvent = Event.findOne({
            attributes: ['date', 'time', 'place', 'room', 'details'],
            include: [
              {
                model: User,
                attributes: ['group_id','role']
              }
            ],
            where: {
              event_id: newEventID
            }
          });
      
          res.status(200).json(newEvent);   
    }
    catch (error) {
        console.log(error)
        return res.status(402).json(error);
    }
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
                    role: response.role,
                    //class_group :response.class_group
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


