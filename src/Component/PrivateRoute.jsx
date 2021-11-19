import React from 'react'
import cookie from 'react-cookies'
import { Route, Redirect } from 'react-router-dom'

export const logout = () => {
  cookie.remove('token')
  sessionStorage.removeItem('token')
}

function PrivateRoute({ component:Component, ...rest}) {
  const haveCookieUserId = cookie.load('token')
  const haveSessionUserId = sessionStorage.getItem('token')
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
