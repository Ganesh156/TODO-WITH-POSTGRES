const pg =require("pg")


const pool = new pg.Pool({
    host:"localhost",
    user:"postgres",
    password:"neobank",
    database:"todo_database",
    port:5432
})

module.exports = pool