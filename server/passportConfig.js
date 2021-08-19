const bcrypt = require("bcryptjs")
const localStrategy = require("passport-local").Strategy
const db = require("./db/db.js")
const { database } = db

module.exports = (passport) => {
  passport.use(
    new localStrategy((username, password, done) => {

    })
  )
}

database.get("SELECT * FROM users", (err, rows) => {
  console.log(rows)
})