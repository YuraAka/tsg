import React, { Component } from 'react';
import './App.css';
import { Link, Router, Route, browserHistory, IndexRoute } from 'react-router'
import auth from './auth'

export function getRoutes() {
  return (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Login}/>
      <Route path="login" component={Login} />
      <Route path="register" component={Registration} />
      
      <Route path="news" component={News} />
      <Route path="myflat" component={MyFlat} />
    </Route>
  </Router>
  )
}

export class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: true //auth.loggedIn()
    }
  }

  componentWillMount() {
    //auth.onChange = (loggedIn) => this.setState({loggedIn})
    //auth.login()
  }

  render() {
    var menuItems = []
    if (this.state.loggedIn) {
      menuItems = [
        {
          title: 'Новости',
          link: '/news'
        },
        {
          title: 'Моя квартира',
          link: '/myflat'
        }
      ]
    } else {
      menuItems = [
        {
          title: 'Вход',
          link: '/login'
        },
        {
          title: 'Регистрация',
          link: '/register'
        }
      ]
    }

    return (
      <div className="App">
        <Header/>
        <div>
          <Menu items={menuItems}/>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export class Login extends Component {
  render() {
    return (<div>login</div>)
  }
}

export class Registration extends Component {
  render() {
    return <div>registration</div>
  }
}

export class News extends Component {
  render() {
    return <div>news</div>
  }
}

export class MyFlat extends Component {
  render() {
    return <div>myflat</div>
  }
}

/*class UnregisteredView extends Component {
  render() {
    const selected = this.props.select === 'login' ? <Login/> : <Registration/>
    return (
    <div>
      <Menu items={[
        {
          title: 'Вход',
          url: 'yandex.ru'
        },
        {
          title: 'Регистрация',
          url: 'google.com'
        }
      ]}/>
      {selected}
    </div>)
  }
}*/

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
  render() {
    return (
    <div>
      <div>{this.props.items.map((item) => 
        <Link key={item.title} to={item.link} activeStyle={ACTIVE}>{item.title}</Link>)
        }
      </div>
    </div>
    )
  }
}
