import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuthContext } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"

const SignIn = () => {
  const usernameRef = useRef()
  const passwordRef = useRef()
  const  logIn  = useAuthContext();
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
		setLoading(true)
		console.log(usernameRef.current.value+"@percariouscielingfan.com"+" "+passwordRef.current.value);
		await logIn(usernameRef.current.value+"@percariouscielingfan.com", passwordRef.current.value)
		history.push("/")
    } catch (err) {
      setError("Failed to log in");
    }
	setLoading(false)
  };

  return (
    <>
      <Card>
        <Card.Body>
          <div>
          <h2 className="text-center mb-4" style={{backgroundColor:'#6675a7', height: 'auto', width: '30%', margin: 'auto', padding: '5px', color: 'white', marginTop: '30px', marginBottom:'50px', borderRadius:'5px'}}>Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={HandleSubmit}>
            <div>
            <Form.Group id="username">
              <Form.Label style={{fontWeight: 'bold', fontFamily: "monospace", fontSize: '1.2em'}}>Username: </Form.Label>
              <Form.Control style = {{borderRadius:'3px', width: '200px'}} type="username" ref={usernameRef} required />
            </Form.Group>
            </div>
            <div style= {{padding: '10px',}}>
            <Form.Group id="password">
              <Form.Label style={{ontWeight: 'bold', fontFamily: "monospace", fontSize: '1.2em'}}>Password: </Form.Label>
              <Form.Control style = {{borderRadius:'3px', width: '200px'}} type="password" ref={passwordRef} required />
            </Form.Group>
            </div>
            <Button disabled={loading} className="w-100" type="submit" style={{padding: '10px', margin: '10px',	backgroundColor: '#6675b0',	borderRadius: '10px', color: 'white', width: '200px', outline: 'none'}}>
              Submit
            </Button>
          </Form>
          </div>
        </Card.Body>
      </Card>
    </>
  )
};

export default SignIn;