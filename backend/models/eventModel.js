import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Event = db.define('events', {
    event_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATE,
        get: function () {
            return this.getDataValue('date').toLocaleString('en-GB');
        }
    },
    time: {
        type: DataTypes.TIME
    },
    place: {
        type: DataTypes.STRING
    },
    room: {
        type: DataTypes.INTEGER
    },
    category: {
        type: DataTypes.STRING
    },
    group_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    club_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    title: {
        type: DataTypes.STRING
    },
    details: {
        type: DataTypes.TEXT
    }

}, {
    timestamps: false,
    freezeTableName: true //to not interfere with the table name (table name same as model name)
});

(async () => {
    await db.sync();
})();

export default Event;