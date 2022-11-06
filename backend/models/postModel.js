import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Post = db.define('posts', {
    post_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    op_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'student_id'
        }
    },
    post_body: {
        type: DataTypes.STRING
    },
    picture: {
        type: DataTypes.BLOB,
        allowNull: true
    },
    dop: {
        type: 'DATETIME',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }

}, {
    freezeTableName: true //to not interfere with the table name (table name same as model name)
});

(async () => {
    await db.sync();
})();

export default Post;