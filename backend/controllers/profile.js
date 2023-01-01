import multer from 'multer';
import bcrypt from "bcrypt";

import User from "../models/userModel.js";
import Role from "../models/role_verifyModel.js";
import Event from "../models/eventModel.js";
import { Order, OrderedItems } from "../models/orderModel.js";
import Product from '../models/productModel.js';



const imgconfig = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, 'uploads/')
  },
  filename: (req, file, callBack) => {
    callBack(null, Date.now() + '-' + 'profile-' + file.originalname)
  }
})

const upload = multer({ storage: imgconfig }).single('photo')
export const changeDP = async (req, res) => {
  let filename;

  upload(req, res, (err) => {
    if (err) {
      console.log(err)
    }
    else {

      if (req.file == undefined) {
        filename = '';
      }
      else {
        filename = 'http://localhost:5000/uploads/' + req.file.filename;
      }

      try {
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
        res.status(422).json({ status: 422, error })
      }
    }
  })
}

export const changePassword = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    const match = await bcrypt.compare(req.body.old_pass, user.password);
    if (!match) {
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
  }
  catch (error) {
    console.log(error)
  }
}



export const CR_verification = async (req, res) => {
  try {
    let stid = req.body.cur_id;
    let input_id = req.body.id;
    if (input_id != stid) {
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
        }, {
          where: {
            student_id: req.body.id
          }
        })
          .then(function () {
            if (response.role === "cr") {
              return res.status(200).json({ msg: "CR verified!" });
            }
            else {
              return res.status(200).json({ msg: "Club Moderator verified!" });
            }
          })
      })

  }
  catch (error) {
    console.log(error)
  }
}

export const createEvent = async (req, res) => {
  try {
    const role = await Role.findOne({
      attributes: ['group_id', 'club_id'],
      where: {
        student_id: req.body.student_id
      }
    });
    const datetime = req.body.date + ' ' + req.body.time + ' +06:00'
    await Event.create({
      date: datetime,
      place: req.body.place + ' ' + req.body.room,
      category: req.body.category,
      group_id: role.group_id,
      club_id: role.club_id,
      title: req.body.details,
    })
      .then(function () {
        return res.status(200).json({ msg: "Event created" });
      })
  }

  catch (error) {
    console.log(error)
  }
}

export const showOrders = async (req, res) => {
  try {
    const results = await Order.findAll({
      attributes: ['order_id', 'DOO', 'amount', 'status'],
      include: [
        {
          model: OrderedItems, as: "items",
          attributes: ['product_id', 'size', 'quantity'],
          include: [
            {
              model: Product, as: "details"
            }
          ],
        }
      ],
      where: {
        buyer_id: req.body.buyer_id
      },
      order: [
        ['DOO', 'DESC']
      ],
    });

    res.status(201).json(results);
  } catch (error) {
    console.log(error);
  }
}

export const showProductOrders = async (req, res) => {
  try {
    const results = await Order.findAll({
      attributes: ['order_id', 'buyer_id', 'DOO', 'amount', 'status', 'shipping', 'contact'],
      subQuery: false,
      where: {
        ['$items.details.seller_id$']: req.body.seller_id
      },
      include: [
        {
          model: OrderedItems, as: "items",
          attributes: ['product_id', 'size', 'quantity'],
          include: [
            {
              model: Product, as: "details"
            }
          ],
        }
      ],
      order: [
        ['DOO', 'DESC']
      ],
    });
    res.status(201).json(results);
  } catch (error) {
    console.log(error);
  }
}

export const changeStatus = async (req, res) => {
  try {
    Order.update({
      status: req.body.status,
    }, {
      where: {
        order_id: req.body.oid
      }
    })
    res.status(201).json({ msg: "Status Updated" });
  } catch (error) {
    console.log(error);
  }
}


export const showMyProduct = async (req, res) => {
  try {
    const results = await Product.findAll({
      attributes: ['product_id', 'product_name', 'price'],
      where: {
        seller_id: req.body.seller_id
      },
      order: [
        ['product_id', 'ASC']
      ],
    });
    res.status(201).json(results);
  } catch (error) {
    console.log(error);
  }
}

