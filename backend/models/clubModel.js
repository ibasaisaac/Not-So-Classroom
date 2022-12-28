import { Sequelize } from "sequelize";
import db from "../config/database.js";


const { DataTypes } = Sequelize;

const Club = db.define('clubs', {
    club_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    club_code: {
        type: DataTypes.INTEGER,
        unique: true
    },
    club_name: {
        type: DataTypes.TEXT
    }
},
    {
        timestamps: false,
        freezeTableName: true //to not interfere with the table name (table name same as model name)
    });

(async () => {
    await db.sync();
})();

export default Club;