import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Role = db.define('role_verify', {
    role_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    student_id: {
        type: DataTypes.INTEGER
    },
    role: {
        type: DataTypes.STRING
    },
    group_id: {
        type: DataTypes.INTEGER
    },
    club_id: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false,
    freezeTableName: true //to not interfere with the table name (table name same as model name)
});

(async () => {
    await db.sync();
})();

export default Role;