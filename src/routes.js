//import {App, Login, Registration, News, MyFlat, NotFound} from './App'
import { IndexRoute, Router, Route, browserHistory } from 'react-router'
import Layout from './components/layout'
import NotFoundPage from './components/not_found_page'
import LoginPage from './components/login_page'
import RegisterPage from './components/register_page'
import HomePage from './components/home_page'
import FlatPage from './components/flat_page'
import WithAuth from './components/protector'
import auth from './auth'
import React from 'react'

function isClient() {
  return (typeof window !== 'undefined' && window.document && window.document.createElement)
}

function requireAuth(nextState, replace) {
  if (!isClient()) {
    return
  }

  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

function redirToHome(nextState, replace) {
  if (!isClient()) {
    return
  }

  if (auth.loggedIn()) {
    replace({
      pathname: '/home',
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


/*const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={LoginPage} onEnter={redirToHome}/>
      <Route path='login' component={LoginPage} onEnter={redirToHome}/>
      <Route path='logout' onEnter={logout}/>
      <Route path='register' component={RegisterPage} onEnter={redirToHome}/>
      
      <Route path='home' component={HomePage} onEnter={requireAuth}/>
      <Route path='flat' component={FlatPage} onEnter={requireAuth}/>
    </Route>
    <Route path='*' component={NotFoundPage}/>
  </Router>
)*/

const routes = (
  //<Router history={browserHistory}>
  <Route path='/' component={Layout}>
    <IndexRoute component={WithAuth(HomePage)} />
    <Route path='home' component={WithAuth(HomePage)} />
    <Route path='login' component={LoginPage} />
    <Route path='register' component={RegisterPage} />
    <Route path='*' component={NotFoundPage} />
  </Route>
  //</Router>
)

export default routes
