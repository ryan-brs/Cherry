import React from 'react'
import cookie from 'react-cookies'
import { Route, Redirect } from 'react-router-dom'
// import { isLogin } from './Log'

export const logout = () => {
  cookie.remove('userId')
  sessionStorage.removeItem('userId')
}

function PrivateRoute({ component:Component, ...rest}) {
  const haveCookieUserId = cookie.load('userId')
  const haveSessionUserId = sessionStorage.getItem('userId')
  console.log('cookies', haveCookieUserId)
  return (
    <Route 
      {...rest}
      render={props => 
        (haveCookieUserId || haveSessionUserId) ? <Component {...props}/> : <Redirect to='/login' />
      }
    />
  )
}

export default PrivateRoute
