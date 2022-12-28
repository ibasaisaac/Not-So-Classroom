import { Sequelize } from "sequelize";
import db from "../config/database.js";


const { DataTypes } = Sequelize;

const Group = db.define('class_groups', {
    group_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    group_code: {
        type: DataTypes.INTEGER,
        unique: true
    },
    group_name: {
        type: DataTypes.TEXT
    },
    dept: {
        type: DataTypes.STRING
    },
    prog: {
        type: DataTypes.STRING
    },
    batch: {
        type: DataTypes.INTEGER
    },
    section: {
        type: DataTypes.INTEGER
    },
    student_count: {
        type: DataTypes.INTEGER
    }
},
    {
        timestamps: false,
        freezeTableName: true //to not interfere with the table name (table name same as model name)
    });

(async () => {
    await db.sync();
})();


export default Group;