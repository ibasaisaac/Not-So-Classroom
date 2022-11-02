import { Sequelize } from "sequelize";

const db = new Sequelize('classroom', 'root', '', {
    logging: false,
    host: "localhost",
    dialect: "mysql",
    define: {
        //timestamps: false,
        allowNull: false
    }
});

db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

export default db;