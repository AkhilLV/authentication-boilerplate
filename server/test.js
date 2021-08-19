const sqlite3 = require("sqlite3")

db = new sqlite3.Database("./db/users.db", (err) => {
  if (err) { console.log("Could not connect to the database", err) } else {
    console.log("Connected to the database")
  }
})

db.get("SELECT * FROM users WHERE username = 'Jane 123 123'", (err, row) => {
  if (err) {
    return console.log(err)
  }
  console.log(row)
})