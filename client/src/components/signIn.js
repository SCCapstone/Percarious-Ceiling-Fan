import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link } from 'react-router-dom';

export default function SignIn() {
  const usernameRef = useRef()
  const passwordRef = useRef()
  const { signin } = useAuth()
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await signin(usernameRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to sign in")
    }

    setLoading(false)
  }

  return (
	  <div>
		  <h1>Username:</h1>
		  <input id="username" style = {inputStylingBasic} value={username} onChange={e => ref={usernameRef}}/>
		  <h1>Password:</h1>
		  <input id="passworn" style = {inputStylingBasic} value={password} onChange={e => ref={passwordRef}}/>
	  </div>
  )
}