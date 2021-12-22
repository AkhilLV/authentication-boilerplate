import "./App.css"
import { useState } from "react"
import axios from "axios"

function App() {
  const [registerUsername, setRegisterUsername] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [loginUsername, setLoginUsername] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  const [loggedIn, setLoggedIn] = useState(false)
  const [userData, setUserData] = useState("")

  const register = () => {
    axios({
      method: "post",
      data: {
        username: registerUsername,
        password: registerPassword
      },
      withCredentials: true,
      url: "http://localhost:5000/register"
    }).then((res) => alert("User created"))
  }

  const login = () => {
    axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:5000/login",
    }).then((res) => setLoggedIn(true))
  }

  const getDocument = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/getUser",
    }).then((res) => {
      setUserData(`${res.data.username}`)
      console.log(res)
    })
  }

  return (
    <div className="App">
      <div>
        <h1>Register</h1>
        <input
          placeholder="username"
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <input
          placeholder="password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button onClick={register}>Submit</button>
      </div>

      <div>
        <h1>Login</h1>
        <input
          placeholder="username"
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          placeholder="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={login}>Submit</button>
      </div>

      <div>
        <div>{loggedIn ? "User is logged in" : "User is not logged in"}</div>
        <button onClick={getDocument}>View document</button>
        <div>{userData}</div>
      </div>
    </div>
  )
}

export default App
