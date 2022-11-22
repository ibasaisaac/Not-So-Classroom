import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const cr = db.define('cr_verify', {
    cr_cnt: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    student_id: {
        type: DataTypes.INTEGER
    },
    dept: {
        type: DataTypes.STRING
    },
    batch: {
        type: DataTypes.INTEGER
    },
    section: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false,
    freezeTableName: true //to not interfere with the table name (table name same as model name)
});

(async () => {
    await db.sync();
})();

export default cr;