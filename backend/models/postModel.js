import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

export const Post = db.define('posts', {
    post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    home: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    group_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    club_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    post_body: {
        type: DataTypes.STRING
    },
    image_path: {
        type: DataTypes.STRING
    },
    dop: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW , 
        get: function () {
            return this.getDataValue('dop').toLocaleString('en-GB');
        }
    }

}, {
    timestamps: false,
    freezeTableName: true //to not interfere with the table name (table name same as model name)
});


export const Comment = db.define('comments', {
    comment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    comment_body: {
        type: DataTypes.STRING
    },
    doc: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW , 
        get: function () {
            return this.getDataValue('doc').toLocaleString('en-GB');
        }
    }

}, {
    timestamps: false,
    freezeTableName: true //to not interfere with the table name (table name same as model name)
});


(async () => {
    await db.sync();
})();
