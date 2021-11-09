import React from 'react'
import { Route, Redirect } from 'react-router-dom'
// import { isLogin } from './Log'

export const logout = () => {
  localStorage.removeItem('userid')
  sessionStorage.removeItem('userid')
}

function PrivateRoute({ component:Component, ...rest}) {
  const haveLocalUserId = localStorage.getItem('userid')
  const haveSessionUserId = sessionStorage.getItem('userid')
  return (
    <Route 
      {...rest}
      render={props => 
        (haveLocalUserId || haveSessionUserId) ? <Component {...props}/> : <Redirect to='/login' />
      }
    />
  )
}

export default PrivateRoute
