import { QueryTypes } from 'sequelize';
import db from '../config/database.js';
import User from "../models/userModel.js";
import {Order, OrderedItems} from "../models/orderModel.js";
import Product from '../models/productModel.js';
import Role from "../models/role_verifyModel.js";
import Event from "../models/eventModel.js";
import multer from 'multer';
import bcrypt from "bcrypt";



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

export const createEvent = async (req, res) => {
    var newEventID
    try {
      const role = await Role.findOne({
        attributes: ['class_group','club_id'],
        where: {
          student_id: req.body.student_id
        }
      });
        await Event.create({
            date: req.body.date,
            time: req.body.time,
            place: req.body.place,
            room: req.body.room,
            category: req.body.category,
            group_id: role.class_group,
            club_id: role.club_id,
            details: req.body.details,
        })
        .then(function (response) {
            newEventID = response.null
          })
          const newEvent = Event.findOne({
            attributes: ['date', 'time', 'place', 'room', 'details'],
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
      let stid = req.body.cur_id;
      let input_id = req.body.id;
      console.log(stid);
      console.log(input_id)
      if(input_id != stid){
        return res.status(402).json({ msg: "Please provide your ID" });
      }
        await Role.findOne({
            attributes: ['role'],
            where: {
                student_id: stid
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
                      if(response.role === "cr"){
                        return res.status(200).json({ msg: "CR verified!" });
                      }
                      else{
                        return res.status(200).json({ msg: "Club Moderator verified!" });
                      }
                    })
            })
            
    }
    catch (error) { console.log(error) }
}

export const ChangePassword = async (req, res) => {

  try {
    const user = await User.findOne({
      where: {
          email: req.body.email
      }
  });
  //  console.log(user.password);
  //  console.log(req.body.old_pass);
    const match = await bcrypt.compare(req.body.old_pass, user.password);
    // console.log('lol0');
      if (!match) {
        // console.log('not match')
          return res.status(400).json({ msg: "Incorrect password" });
      }
    
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(req.body.new_pass, salt);
      await User.update({
        password: hashPassword
    }, {
        where: {
            email: req.body.email
        }
    });
    res.status(200).json({ msg: "Password changed" });
  } catch (error) {
    console.log(error) 
  }
}


export const showOrders  = async (req, res) => {
  try {
    console.log('hi', req.body)
    // const results = await Order.findAll({
    //   attributes: ['order_id', 'DOO',	'amount', 'status'],
    //   include: [
    //     {
    //       model: OrderedItems, as: "items",
    //       attributes: ['product_id', 'size', 'quantity'],
    //       include: [
    //         {
    //           model: Product, as: "item"
    //         }
    //       ],
    //     }
    //   ],
    //   where: {
    //     buyer_id: req.body.buyer_id
    //   },
    //   order: [
    //     ['DOO', 'DESC']
    //   ],
    // });
    // res.status(201).json(results);
  } catch (error) {
    console.log(error);
  }
}