import { Sequelize } from "sequelize";
import db from "../config/database.js";
import {Post, Comment} from "../models/postModel.js";
import Media from "../models/mediaModel.js";
import Group from "../models/groupModel.js";
import Club from "../models/clubModel.js";

const { DataTypes } = Sequelize;

const User = db.define('users', {
    student_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    refresh_token: {
        type: DataTypes.TEXT
    },
    DOR: {
        type: 'DATETIME',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    dp: {
        type: DataTypes.STRING
    },
    class_group: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
    {
        freezeTableName: true //to not interfere with the table name (table name same as model name)
    });

(async () => {
    await db.sync();
})();

User.hasMany(Post, { as: "posts", foreignKey: "op_id" });
Post.belongsTo(User, { as: "post_op", foreignKey: "op_id" });

User.hasMany(Comment, { as: "comments", foreignKey: "op_id" });
Comment.belongsTo(User, { as: "comment_op", foreignKey: "op_id" });

Post.hasMany(Comment, { as: "comments", foreignKey: "post_id" });
Comment.belongsTo(Post, { as: "post", foreignKey: "post_id" });
Post.hasMany(Media, { as: "media", foreignKey: "post_id" });
Media.belongsTo(Post, { as: "media", foreignKey: "post_id" });

User.belongsTo(Group, { as: "group", foreignKey: "class_group" });
Group.hasMany(User, { as: "students", foreignKey: "class_group" });

User.belongsToMany(Club, { through: 'Club_members' });
Club.belongsToMany(User, { through: 'Club_members' });


export default User;