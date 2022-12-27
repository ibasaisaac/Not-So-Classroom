import { QueryTypes, Op } from 'sequelize';
import db from '../config/database.js'
import { Post, Comment } from "../models/postModel.js";
import Event from "../models/eventModel.js";
import User from "../models/userModel.js";
import Group from "../models/groupModel.js"
import Product from "../models/productModel.js"
import { ScheduleMon, ScheduleTue, ScheduleWed, ScheduleThu, ScheduleFri } from "../models/scheduleModel.js";
import { Order, OrderedItems } from "../models/orderModel.js";
import multer from 'multer';


const storage = multer.diskStorage({
  destination: function (req, file, callBack) {
    callBack(null, 'uploads/')
  },
  filename: (req, file, callBack) => {
    callBack(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage }).single('file')
const uploads = multer({ storage: storage }).array('files')


export const submitPost = async (req, res) => {
  var newPostId
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
        Post.create({
          op_id: req.body.op_id,
          [req.body.category]: req.body.category_id,
          post_body: req.body.post_body,
          image_path: filename
        })
          .then(function (response) {
            newPostId = response.null

            Post.findOne({
              attributes: ['post_id', 'dop', 'post_body', 'image_path'],
              include: [
                {
                  model: Comment, as: "comments",
                  attributes: ['comment_id', 'doc', 'comment_body'],
                  include: [
                    {
                      model: User, as: "comment_op",
                      attributes: ['student_id', 'username']
                    }
                  ],
                },
                {
                  model: User, as: "post_op",
                  attributes: ['student_id', 'username', 'dp']
                }
              ],
              where: {
                post_id: newPostId
              }
            })
              .then(function (newPost) {
                res.status(200).json(newPost)
              })
              .catch(err => {
                console.log(err);
              })
          })
      }
      catch (error) {
        console.log(error);
      }
    }
  })
}

export const editPost = async (req, res) => {
  try {
    Post.update({
      post_body: req.body.post_body
    }, {
      where: { post_id: req.body.post_id }
    });
    res.status(200).json({ msg: "Post Updated!" });
  } catch (error) {
    console.log(error);
  }
}

export const deletePost = async (req, res) => {
  try {
    Post.destroy({
      where: { post_id: req.body.post_id }
    });
    res.status(200).json({ msg: "Post Deleted!" });
  } catch (error) {
    console.log(error);
  }
}

export const showPost = async (req, res) => {
  try {
    const results = await Post.findAll({
      attributes: ['post_id', 'dop', 'post_body', 'image_path'],
      include: [
        {
          model: Comment, as: "comments",
          attributes: ['comment_id', 'doc', 'comment_body'],
          include: [
            {
              model: User, as: "comment_op",
              attributes: ['student_id', 'username']
            }
          ],
        },
        {
          model: User, as: "post_op",
          attributes: ['student_id', 'username', 'dp']
        }
      ],
      where: {
        [req.body.category]: req.body.category_id
      },
      order: [
        ['dop', 'DESC'],
        [Comment, 'doc', 'DESC']
      ],
    });

    res.json(results);
  } catch (error) {
    console.log(error);
  }
}

export const submitComment = async (req, res) => {
  var newCommentId
  try {
    await Comment.create({
      post_id: req.body.post_id,
      op_id: req.body.op_id,
      comment_body: req.body.comment_body
    }).then(function (response) {
      newCommentId = response.null
    })

    const newComment = await Comment.findOne({
      attributes: ['comment_id', 'doc', 'comment_body'],
      include: [
        {
          model: User, as: "comment_op",
          attributes: ['student_id', 'username']
        }
      ],
      where: {
        comment_id: newCommentId
      }
    });

    res.status(200).json(newComment);

  } catch (error) {
    console.log(error);
  }
}

export const editComment = async (req, res) => {
  try {
    Comment.update({
      comment_body: req.body.comment_body
    }, {
      where: { comment_id: req.body.comment_id }
    });
    res.status(200).json({ msg: "Comment Updated!" });
  } catch (error) {
    console.log(error);
  }
}

export const deleteComment = async (req, res) => {
  try {
    Comment.destroy({
      where: { comment_id: req.body.comment_id }
    });
    res.status(200).json({ msg: "Comment Deleted!" });
  } catch (error) {
    console.log(error);
  }
}

export const showEvent = async (req, res) => {

  try {
    const results = {
      quiz: await Event.findAll({
        where: {
          category: 'Quiz',
          group_id: { [Op.or]: [req.body.id, null] }
        },
        order: [
          ['date', 'ASC']
        ],
        limit: 4
      }),

      event: await Event.findAll({
        where: {
          category: { [Op.notIn]: ['Quiz'] },
          group_id: { [Op.or]: [req.body.id, null] }
        },
        order: [
          ['date', 'ASC']
        ],
        limit: 2
      })
    }

    res.json(results);
  } catch (error) {
    console.log(error);
  }
}

export const search = async (req, res) => {
  const room = req.body.building + ' ' + req.body.room
  try {
    var results;
    if (req.body.day === 'Mon') {
      results = await ScheduleMon.findOne({
        include: [
          {
            model: Group, as: "p1_group_details",
            attributes: ['prog', 'batch', 'section']
          },
          {
            model: Group, as: "p2_group_details",
            attributes: ['prog', 'batch', 'section']
          },
          {
            model: Group, as: "p3_group_details",
            attributes: ['prog', 'batch', 'section']
          },
          {
            model: Group, as: "p4_group_details",
            attributes: ['prog', 'batch', 'section']
          },
          {
            model: Group, as: "p5_group_details",
            attributes: ['prog', 'batch', 'section']
          },
          {
            model: Group, as: "p6_group_details",
            attributes: ['prog', 'batch', 'section']
          }
        ],
        where: {
          room: room
        }
      })
    }
    else if (req.body.day === 'Tue') {
      results = await ScheduleTue.findOne({
        include: [
          {
            model: Group, as: "p1_group_details",
            attributes: ['prog', 'batch', 'section']
          },
          {
            model: Group, as: "p2_group_details",
            attributes: ['prog', 'batch', 'section']
          },
          {
            model: Group, as: "p3_group_details",
            attributes: ['prog', 'batch', 'section']
          },
          {
            model: Group, as: "p4_group_details",
            attributes: ['prog', 'batch', 'section']
          },
          {
            model: Group, as: "p5_group_details",
            attributes: ['prog', 'batch', 'section']
          },
          {
            model: Group, as: "p6_group_details",
            attributes: ['prog', 'batch', 'section']
          }
        ],
        where: {
          room: room
        }
      })
    }
    else if (req.body.day === 'Wed') {
      results = await ScheduleWed.findOne({
        include: [
          {
            model: Group, as: "p1_group_details",
            attributes: ['prog', 'batch', 'section']
          },
          {
            model: Group, as: "p2_group_details",
            attributes: ['prog', 'batch', 'section']
          },
          {
            model: Group, as: "p3_group_details",
            attributes: ['prog', 'batch', 'section']
          },
          {
            model: Group, as: "p4_group_details",
            attributes: ['prog', 'batch', 'section']
          },
          {
            model: Group, as: "p5_group_details",
            attributes: ['prog', 'batch', 'section']
          },
          {
            model: Group, as: "p6_group_details",
            attributes: ['prog', 'batch', 'section']
          }
        ],
        where: {
          room: room
        }
      })
    }
    else if (req.body.day === 'Thu') {
      results = await ScheduleThu.findOne({
        include: [
          {
            model: Group, as: "p1_group_details",
            attributes: ['prog', 'batch', 'section']
          },
          {
            model: Group, as: "p2_group_details",
            attributes: ['prog', 'batch', 'section']
          },
          {
            model: Group, as: "p3_group_details",
            attributes: ['prog', 'batch', 'section']
          },
          {
            model: Group, as: "p4_group_details",
            attributes: ['prog', 'batch', 'section']
          },
          {
            model: Group, as: "p5_group_details",
            attributes: ['prog', 'batch', 'section']
          },
          {
            model: Group, as: "p6_group_details",
            attributes: ['prog', 'batch', 'section']
          }
        ],
        where: {
          room: room
        }
      })
    }
    else if (req.body.day === 'Fri') {
      results = await ScheduleFri.findOne({
        include: [
          {
            model: Group, as: "p1_group_details",
            attributes: ['prog', 'batch', 'section']
          },
          {
            model: Group, as: "p2_group_details",
            attributes: ['prog', 'batch', 'section']
          },
          {
            model: Group, as: "p3_group_details",
            attributes: ['prog', 'batch', 'section']
          },
          {
            model: Group, as: "p4_group_details",
            attributes: ['prog', 'batch', 'section']
          },
          {
            model: Group, as: "p5_group_details",
            attributes: ['prog', 'batch', 'section']
          },
          {
            model: Group, as: "p6_group_details",
            attributes: ['prog', 'batch', 'section']
          }
        ],
        where: {
          room: room
        }
      })
    }
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
  }
}

export const showProduct = async (req, res) => {
  try {
    const results = await Product.findAll({
      where: {
        club_id: req.body.club_id
      },
      order: [
        ['product_id', 'DESC']
      ],
      limit: 10
    })
    res.json(results);
  } catch (error) {
    console.log(error);
  }
}

export const addProduct = async (req, res) => {
  var newProductId
  let picname = []

  uploads(req, res, (err) => {
    if (err) {
      console.log(err)
    }
    else {
      Array.from(req.files).map((i) => (
        picname.push('http://localhost:5000/uploads/' + i.filename)
      ))
      try {
        Product.create({
          club_id: req.body.club_id,
          seller_id: req.body.seller_id,
          product_name: req.body.product_name,
          stock: req.body.stock,
          S_stock: req.body.s_stock,
          M_stock: req.body.m_stock,
          L_stock: req.body.l_stock,
          price: req.body.price,
          product_info: req.body.info,
          pic1_path: picname[0],
          pic2_path: picname[1],
          pic3_path: picname[2]
        })
          .then(function (response) {
            newProductId = response.product_id
            Product.findOne({
              where: {
                product_id: newProductId
              },
            })
              .then(function (newProduct) {
                res.status(200).json(newProduct)
              })
              .catch(err => {
                console.log(err);
              })
          })
      }
      catch (error) {
        console.log(error);
      }
    }
  })
}

export const buyProduct = async (req, res) => {
  var newOrderId
  try {
    Order.create({
      buyer_id: req.body.buyer_id,
      amount: req.body.amount,
      shipping: req.body.shipping,
      contact: req.body.contact,
      status: 'pending'
    })
      .then(function (response) {
        newOrderId = response.order_id
        console.log(newOrderId)
        OrderedItems.create({
          order_id: newOrderId,
          product_id: req.body.product_id,
          size: req.body.size,
          quantity: req.body.quantity
        })
        Product.increment({
          [req.body.size + '_stock']: -req.body.quantity
        },
          { where: { product_id: req.body.product_id } })
          .then(function () {
            res.status(200).json({ msg: "Order placed" });
          })
          .catch(err => {
            console.log(err);
          })
      })
  } catch (error) {
    console.log(error);
  }
}
