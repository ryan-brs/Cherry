import { useState } from 'react';
import cookie from 'react-cookies'
import axios from 'axios';
import { Form, Card, Button, Container } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'
import '../App.css';


const Login = () => {

  const baseURL = "http://206.189.39.185:5031/api"

  const [details, setDetails] = useState(
    { name: "", email: "", password: "" }
  );

  const [checkbox, setCheckBox] = useState(false)
  console.log(checkbox)

  const submitHandler = (e) => {
    e.preventDefault()
    login(details)
  }

  const history = useHistory()

  const login = (details) => {
    axios.post(`${baseURL}/User/UserLogin`, {
      "userName": details.name,
      "password": details.password,
    })
      .then((res) => {
        if (res.status === 200 && checkbox) {
          cookie.save(
            'token',
            res.data.data.token,
            {
              path:'/',
              maxAge: 60 * 60 * 24 * 7
            }
          )
          history.push('/productlist');
        }
        if (res.status === 200 && !checkbox) {
          sessionStorage.setItem('token', res.data.data.token);
          history.push('/productlist');
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <Container style={{margin:'50px auto', width:'500px'}}>
      <Card>
        <Card.Body>
          <Form>
            <h3>Log In</h3>
            <Form.Group>
              <Form.Label>User Name</Form.Label>
              <Form.Control type='text' name='name'
                onChange={
                  (e) => {
                    return setDetails({ ...details, name: e.target.value });
                  }
                } required />
            </Form.Group>
            <Form.Group style={{marginTop:'20px'}}>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' name='name'
                onChange={
                  (e) => {
                    return setDetails({ ...details, email: e.target.value });
                  }
                } required />
            </Form.Group>
            <Form.Group style={{marginTop:'20px'}}>
              <Form.Label>Password</Form.Label>
              <Form.Control type='email' name='name'
                onChange={
                  (e) => {
                    return setDetails({ ...details, password: e.target.value });
                  }
                } required />
            </Form.Group>
            <Button 
              onClick={submitHandler} 
              style={{marginTop:'20px', width:'442px'}}>LOGIN
            </Button>
            <div style={{display:'flex', marginTop:'20px'}}>
              <Form.Check 
              style={{marginTop:'10px'}}
              label={'Remember me'} 
              value={checkbox}
              onChange = {e => setCheckBox(e.currentTarget.checked)}
              />
              <p style={{margin:'10px 15px'}}>No account? <Link to='/signup'>Sign Up</Link> </p>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Login
