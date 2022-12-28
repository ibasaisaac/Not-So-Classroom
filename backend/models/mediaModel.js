import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Media = db.define('media', {
    media_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    post_id: {
        type: DataTypes.INTEGER
    },
    type: {
        type: DataTypes.STRING
    },
    path: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false,
    freezeTableName: true //to not interfere with the table name (table name same as model name)
});

(async () => {
    await db.sync();
})();

export default Media