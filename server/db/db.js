const sqlite3 = require("sqlite3")

class db {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) { console.log("Could not connect to the database", err) } else {
        console.log("Connected to the database")
      }
    })

    this.db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT
      )
    `)
  }

  add(username, password) {
    this.db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err) => {
      if (err) {
        console.log('ERROR!', err)
      } else {
        console.log("User added")
      }
    })
  }

  includes(username, password, database) {
    this.db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
      if (row) {
        console.log("User exists")
      } else {
        database.add(username, password)
      }
    })
  }
}

const database = new db("./users.db")
module.exports = { database }