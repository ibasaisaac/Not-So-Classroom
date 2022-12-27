import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Product from "./productModel.js";

const { DataTypes } = Sequelize;

export const Order = db.define('orders', {
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    buyer_id: {
        type: DataTypes.INTEGER
    },
    DOO: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        get: function () {
            return this.getDataValue('DOO').toLocaleString('en-GB');
        }
    },
    amount: {
        type: DataTypes.DECIMAL(6, 2)
    },
    shipping: {
        type: DataTypes.STRING
    },
    contact: {
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

export const OrderedItems = db.define('ordered_items', {
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    size: {
        type: DataTypes.STRING
    },
    quantity: {
        type: DataTypes.INTEGER
    },
},
    {
        timestamps: false,
        freezeTableName: true //to not interfere with the table name (table name same as model name)
    });


(async () => {
    await db.sync();
})();

Order.hasMany(OrderedItems, { as: "items", foreignKey: "order_id" });
OrderedItems.belongsTo(Product, { as: "details", foreignKey: "product_id" });
