import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Product = db.define('products', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    club_id: {
        type: DataTypes.INTEGER
    },
    seller_id: {
        type: DataTypes.INTEGER
    },
    product_name: {
        type: DataTypes.STRING
    },
    stock: {
        type: DataTypes.INTEGER
    },
    S_stock: {
        type: DataTypes.INTEGER
    },
    M_stock: {
        type: DataTypes.INTEGER
    },
    L_stock: {
        type: DataTypes.INTEGER
    },
    price: {
        type: DataTypes.DECIMAL(6, 2)
    },
    product_info: {
        type: DataTypes.TEXT
    },
    pic1_path: {
        type: DataTypes.STRING
    },
    pic2_path: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pic3_path: {
        type: DataTypes.STRING,
        allowNull: true
    },

},
    {
        timestamps: false,
        freezeTableName: true //to not interfere with the table name (table name same as model name)
    });

(async () => {
    await db.sync();
})();


export default Product;