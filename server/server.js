const express = require("express")
const cors = require("cors")
const passport = require("passport")
const passportLocal = require("passport-local").Strategy
const cookieParser = require("cookie-parser")
const bcrypt = require("bcryptjs")
const session = require("express-session")

const db = require("./db/db.js")
const { database } = db

const app = express()

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // To parse the incoming requests with JSON payloads

app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
)

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
)

app.use(cookieParser("secretcode"))

// Routes
app.post("/login", (req, res) => {
  console.log(req.body)
})

app.post("/register", async (req, res) => {
  const encryptedPassword = await bcrypt.hash(req.body.password, 10)
  database.includes(req.body.username, encryptedPassword, database)
})

app.get("/getUser", (req, res) => {
  console.log(req.body)

  res.send(database.get(req.body.username))
})

// Start Server
app.listen(4000, () => {
  console.log("Server is running at PORT: 4000")
})