import { useState } from 'react';
import cookie from 'react-cookies'
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom'
import '../App.css';


const Login = () => {

  const baseURL = "http://206.189.39.185:5031/api"

  const [details, setDetails] = useState(
    { name: "", email: "", password: "" }
  );

  const [checkbox, setCheckBox] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault()
    login(details)
  }

  const history = useHistory()

  const login = (details) => {
    // const expires = new Date()
    // expires.setDate(Date.now() + 1000 * 60)
    axios.post(`${baseURL}/User/UserLogin`, {
      "userName": details.name,
      "password": details.password,
    })
      .then((res) => {
        // console.log(res.data.data.token)
        if (res.status === 200 && checkbox) {
          cookie.save(
            'userId',
            res.data.data.userId,
            {
              path:'/',
              // expires,
              maxAge: 60 * 60 * 24 * 7
            }
          )
          history.push('/productlist');
        }
        if (res.status === 200 && !checkbox) {
          sessionStorage.setItem('userId', res.data.data.userId);
          history.push('/productlist');
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <form className='form' onSubmit={submitHandler}>
      <div>
        <h3>Log In </h3>
        <label htmlFor="name">User Name: </label>
        <input type="text" name="name"
          onChange={
            (e) => setDetails({ ...details, name: e.target.value })
          } required />
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input type="email" name="email"
          onChange={
            (e) => setDetails({ ...details, email: e.target.value })
          } required />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="password" name="password"
          onChange={
            (e) => setDetails({ ...details, password: e.target.value })
          } required />
      </div>
      <div>
        <input type="submit" value="LOGIN" style={{ marginTop: '20px' }} />
      </div>
      <div>
        <input
          type="checkbox" 
          id="rememberme" 
          style={{ width: '20px', marginTop: '20px' }} 
          value={checkbox}
          onChange = {e => setCheckBox(e.currentTarget.checked)}
          />
        <label htmlFor="rememberme" style={{ display: 'inline' }} >Remember me</label>
      </div>
      <p style={{ marginTop: '15px', textAlign: 'center' }}>No account? <Link to='/signup'>Sign Up</Link> </p>
    </form>
  )
}

export default Login
