//import {App, Login, Registration, News, MyFlat, NotFound} from './App'
import { IndexRoute, Router, Route, browserHistory } from 'react-router'
import Layout from './components/layout'
import NotFoundPage from './components/not_found_page'
import LoginPage from './components/login_page'
import RegisterPage from './components/register_page'
import HomePage from './components/home_page'
import FlatPage from './components/flat_page'
import ArticlePage from './components/article_page'
import auth from './auth'
import React from 'react'

function requireAuth(nextState, replace) {
  if (!auth.isLoggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

function requireAnon(nextState, replace) {
  if (auth.isLoggedIn()) {
    replace({
      pathname: '/home',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={HomePage} onEnter={requireAuth}/>
      <Route path='login' component={LoginPage} onEnter={requireAnon}/>
      <Route path='register' component={RegisterPage} onEnter={requireAnon}/>
      
      <Route path='home' component={HomePage} onEnter={requireAuth}/>
      <Route path='flat' component={FlatPage} onEnter={requireAuth}/>
      <Route path='news/:id' component={ArticlePage} onEnter={requireAuth}/>
    </Route>
    <Route path='*' component={NotFoundPage}/>
  </Router>
)

/*const routes = (
  <Route path='/' component={Layout}>
    <IndexRoute component={WithAuth(HomePage)} />
    <Route path='home' component={WithAuth(HomePage)} />
    <Route path='login' component={LoginPage} />
    <Route path='register' component={RegisterPage} />
    <Route path='*' component={NotFoundPage} />
  </Route>
)*/

export default routes
