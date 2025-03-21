const PORT = process.env.PORT || 3000
const DB_HOST = process.env.MYSQLHOST || "localhost"
const DB_PORT = process.env.MYSQLPORT || 3306
const DB_NAME = process.env.MYSQLDATABASE || "login"
const DB_USER = process.env.MYSQLUSER || "root"
const DB_PASSWORD = process.env.MYSQLPASSWORD || "" 

const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1"
const REDIS_PORT = process.env.REDIS_PORT || 6379
const REDIS_URL = process.env.REDIS_URL || `redis://${REDIS_HOST}:${REDIS_PORT}`

// const RAILWAY_TCP_PROXY_DOMAIN = process.env.RAILWAY_TCP_PROXY_DOMAIN || 'shortline.proxy.rlwy.net'
// const RAILWAY_TCP_PROXY_PORT = process.env.RAILWAY_TCP_PROXY_PORT || 41054

module.exports = {
    //mySql
    PORT,
    DB_PORT,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,

    //Redis
    REDIS_HOST,
    REDIS_PORT,
    REDIS_URL
}
