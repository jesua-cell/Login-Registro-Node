const PORT = process.env.PORT || 3000
const DB_HOST = process.env.MYSQLHOST || "localhost"
const DB_PORT = process.env.MYSQLPORT || 3306
const DB_NAME = process.env.MYSQLDATABASE || "login"
const DB_USER = process.env.MYSQLUSER || "root"
const DB_PASSWORD = process.env.MYSQLPASSWORD || "" 

const REDISHOST = process.env.REDISHOST || "127.0.0.1"
const REDISPORT = process.env.REDISPORT || 6379
const REDISPASSWORD = process.env.REDISPASSWORD || ''
const REDIS_URL = process.env.REDIS_URL || `redis://:${REDISPASSWORD}@${REDISHOST}:${REDISPORT}`

module.exports = {
    //mySql
    PORT,
    DB_PORT,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,

    //Redis
    REDISHOST,
    REDISPORT,
    REDIS_URL
}
