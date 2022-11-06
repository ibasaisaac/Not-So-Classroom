import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Comment = db.define('comments', {
    comment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'posts',
            key: 'post_id'
        }
    },
    op_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'student_id'
        }
    },
    comment_body: {
        type: DataTypes.STRING
    },
    doc: {
        type: 'DATETIME',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }

}, {
    freezeTableName: true //to not interfere with the table name (table name same as model name)
});

(async () => {
    await db.sync();
})();

export default Comment;