require("dotenv").config();

module.exports = {
  development: {
    username: process.env.username,
    password: process.env.password,
    database: process.env.database,
    host: process.env.host,
    dialect: "mysql",
    port: process.env.port,
    logging: false,
  },
  test: {
    username: process.env.test_username,
    password: process.env.test_password,
    database: process.env.test_database,
    host: process.env.test_host,
    dialect: "mysql",
    port: process.env.test_port,
    logging: false,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: process.env.DB_DIALECTS,
    port: process.env.DB_PORT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
