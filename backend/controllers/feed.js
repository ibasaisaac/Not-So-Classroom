import { QueryTypes } from 'sequelize';
import db from '../config/database.js'


export const submitPost = async (req, res) => {
}

export const showPost = async (req, res) => {
    try {
        const results = await db.query(
            "SELECT users.username, posts.post_body, posts.picture, posts.dop, DATE(posts.dop) AS TIME FROM posts JOIN users ON posts.op_id = users.student_id", { type: QueryTypes.SELECT }
          );
            res.json(results);
    } catch (error) {
        console.log(error);
    }
}