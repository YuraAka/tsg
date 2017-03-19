//import {App, Login, Registration, News, MyFlat, NotFound} from './App'
import { IndexRoute, Router, Route, browserHistory } from 'react-router'
import Layout from './components/layout'
import NotFoundPage from './components/not_found_page'
import LoginPage from './components/login_page'
import RegisterPage from './components/register_page'
//import auth from './auth'
import React from 'react'

/*function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

function redirToNews(nextState, replace) {
  if (auth.loggedIn()) {
    replace({
      pathname: '/news',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

function logout(nextState, replace) {
  auth.logout()
  replace({
    pathname: '/login',
    state: { nextPathname: nextState.location.pathname }
  })
}


const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Login} onEnter={redirToNews}/>
      <Route path='login' component={Login} onEnter={redirToNews}/>
      <Route path='logout' onEnter={logout}/>
      <Route path='register' component={Registration} onEnter={redirToNews}/>
      
      <Route path='news' component={News} onEnter={requireAuth}/>
      <Route path='myflat' component={MyFlat} onEnter={requireAuth}/>
    </Route>
    <Route path='*' component={NotFound}/>
  </Router>
)*/

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={LoginPage}/>
      <Route path='login' component={LoginPage}/>
      <Route path='register' component={RegisterPage}/>
      <Route path='*' component={NotFoundPage}/>
    </Route>
  </Router>
)

export default routes
