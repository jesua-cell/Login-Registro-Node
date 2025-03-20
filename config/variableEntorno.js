const PORT = process.env.PORT || 3000
const DB_PORT = process.env.MYSQLPORT || 3306
const DB_HOST = process.env.MYSQLHOST || "localhost"
const DB_NAME = process.env.MYSQL_DATABASE || "login"
const DB_USER = process.env.MYSQLUSER || "root"
const DB_PASSWORD = process.env.MYSQLPASSWORD || "" 

module.exports = {
    PORT,
    DB_PORT,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME
}
