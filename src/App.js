import React, { Component } from 'react';
import './App.css';
import { Link, IndexRoute, Router, Route, browserHistory } from 'react-router'
import auth from './auth'

export class App extends Component {
  constructor() {
    super();
    auth.login()
    this.state = {
      loggedIn: auth.loggedIn()
    }
  }

  componentDidMount() {
    auth.onChange = (loggedIn) => this.setState({loggedIn})
  }

  render() {
    return (
      <div className='App'>
        <Header/>
        <div>
          <Menu loggedIn={this.state.loggedIn}/>
          {this.props.children}
        </div>
      </div>
    )
  }
}

class Login extends Component {
  constructor() {
    super()
    this.state = {
      error: false,
      flat: null,
      password: null
    };
  }

  onSubmit(event) {
    event.preventDefault()
    auth.login(this.state.flat, this.state.password, this.onLoginCheck.bind(this))
  }

  onLoginCheck(loggedIn) {
    if (!loggedIn) {
      return this.setState({ error: true })
    }

    const { location } = this.props

    // anti-react pattern, but I don't know how to make better (thru callback)
    if (location.state && location.state.nextPathname !== '/logout') {
      this.props.router.replace(location.state.nextPathname)
    } else {
      this.props.router.replace('/news')
    }
  }

  onFlatChange(event) {
    this.setState({flat: event.target.value})
  }

  onPasswordChange(event) {
    this.setState({password: event.target.value})
  }

  render() {
    return (
      <div>
        <p>Login</p>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label><input placeholder='flat' onChange={this.onFlatChange.bind(this)}/></label>
          <label><input placeholder='password' onChange={this.onPasswordChange.bind(this)}/></label> (hint: 123)<br />
          <button type='submit'>login</button>
          {this.state.error && (
            <p>Access denied</p>
          )}
        </form>
      </div>
    )
  }
}

class Registration extends Component {
  render() {
    return <div>registration</div>
  }
}

class News extends Component {
  render() {
    return <div>news</div>
  }
}

class MyFlat extends Component {
  render() {
    return <div>myflat</div>
  }
}

class NotFound extends Component {
  render() {
    return (<div>Not found</div>)
  }
}

class Header extends Component {
  render() {
    return (
      <div>
        <div>ТСЖ &laquo;Райский уголок&raquo;</div>
        <div>Строгинский бульвар д.26к4</div>
      </div>
    );
  }
}

const ACTIVE = { color: 'red' }

class Menu extends Component {
  constructor() {
    super();
    this.state = {
      unregItems : [
        {
          title: 'Вход',
          link: '/login'
        },
        {
          title: 'Регистрация',
          link: '/register'
        }
      ],
      regItems : [
        {
          title: 'Новости',
          link: '/news'
        },
        {
          title: 'Моя квартира',
          link: '/myflat'
        },
        {
          title: 'Выход',
          link: '/logout'
        }
      ]
    }
  }
  render() {
    const items = this.props.loggedIn ? this.state.regItems : this.state.unregItems
    return (
    <div>
      <div>{items.map((item) => 
        <Link key={item.title} to={item.link} activeStyle={ACTIVE}>{item.title}</Link>)
        }
      </div>
    </div>
    )
  }
}

function requireAuth(nextState, replace) {
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

export function getRoutes() {
  return (
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
  )
}
