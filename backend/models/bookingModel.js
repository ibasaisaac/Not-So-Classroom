import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Booking = db.define('bookings', {
    booking_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    participant_id: {
        type: DataTypes.INTEGER,
        unique: true,
    },
    DOB: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        get: function () {
            return this.getDataValue('DOB').toLocaleString('en-GB');
        }
    },
    session_id: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.STRING
    },
},
    {
        timestamps: false,
        freezeTableName: true //to not interfere with the table name (table name same as model name)
    });


(async () => {
    await db.sync();
})();

export default Booking;