import { useState } from 'react'
import { useHistory } from 'react-router';
import { Form, Card, Button, Container } from 'react-bootstrap'
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';


const Signup = () => {

  const baseURL = "http://206.189.39.185:5031/api"

  const [regiInfo, setRegiInfo] = useState(
    { name: "", email: "", password: "" }
  );

  const signHanlder = (e) => {
    e.preventDefault()

    Signup(regiInfo)
  }

  const history = useHistory()

  const Signup = regiInfo => {
    axios.post(`${baseURL}/User/UserRegister`, {
      "userName": regiInfo.name,
      "password": regiInfo.password,
      "email": regiInfo.email,
    })
      .then(res => console.log(res))
    history.push('/login')
  }

  return (
    <Container style={{ margin: '50px auto', width: '500px' }}>
      <Card>
        <Card.Body>
          <Form>
            <h3>Sign Up</h3>
            <Form.Group>
              <Form.Label>User Name</Form.Label>
              <Form.Control type='text' name='name'
                onChange={
                  (e) => {
                    return setRegiInfo({ ...regiInfo, name: e.target.value });
                  }
                } required />
            </Form.Group>
            <Form.Group style={{ marginTop: '20px' }}>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' name='name'
                onChange={
                  (e) => {
                    return setRegiInfo({ ...regiInfo, email: e.target.value });
                  }
                } required />
            </Form.Group>
            <Form.Group style={{ marginTop: '20px' }}>
              <Form.Label>Password</Form.Label>
              <Form.Control type='email' name='name'
                onChange={
                  (e) => {
                    return setRegiInfo({ ...regiInfo, password: e.target.value });
                  }
                } required />
            </Form.Group>
            <Button
              onClick={signHanlder}
              style={{ marginTop: '20px', width: '442px' }}>SIGNUP
            </Button>
            <p style={{ marginTop:'30px'}}>Already have an account? <Link to='/login'>Log In</Link> </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
    // <form className='form' onSubmit={signHanlder}>
    //   <div>
    //     <h3>Sign Up</h3>
    //     <label htmlFor="username">User Name: </label>
    //     <input type="text"
    //       onChange={
    //         (e) => setRegiInfo({ ...regiInfo, name: e.target.value })
    //       } required />
    //   </div>
    //   <div>
    //     <label htmlFor="email">Email: </label>
    //     <input type="email"
    //       onChange={
    //         (e) => setRegiInfo({ ...regiInfo, email: e.target.value })
    //       } required />
    //   </div>
    //   <div>
    //     <label htmlFor="password">Password: </label>
    //     <input type="password"
    //       onChange={
    //         (e) => setRegiInfo({ ...regiInfo, password: e.target.value })
    //       } required />
    //   </div>
    //   <div>
    //     <input type="submit" value="SIGNUP" style={{marginTop: '20px'}}/>
    //   </div>
    //   <p style={{marginTop: '15px', textAlign: 'center'}}>Already have an account? <Link to='/login'>Log In</Link> </p>
    // </form>
  )
}

export default Signup
