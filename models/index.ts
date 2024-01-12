import { Sequelize,Options } from "sequelize";

const options: Options = {
    username: "postgres",
    port: 5432,
    host: "localhost",
    database: "funTimes",
    password: "123",
    dialect: "postgres",
    logging: true
}

const sequelize = new Sequelize(options);

export default sequelize;