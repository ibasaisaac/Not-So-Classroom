import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const User = db.define('users',{
    student_id:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    email:{
        type: DataTypes.STRING,
        unique: true
    },
    password:{
        type: DataTypes.STRING
    },
    username:{
        type: DataTypes.STRING,
        unique: true
    },
    refresh_token:{
        type: DataTypes.TEXT
    },
    DOR: {
        type: 'DATETIME',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
    dp: {
        type: DataTypes.BLOB,
        allowNull: true
    }

},{
    freezeTableName:true //to not interfere with the table name (table name same as model name)
});
 
(async () => {
    await db.sync();
})();
 
export default User;