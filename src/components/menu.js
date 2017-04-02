import React from 'react'
import {Link} from 'react-router'

const ACTIVE = { color: 'red' }
const ITEMS_FOR_VISITORS = [
  {
    title: 'Вход',
    link: '/login'
  },
  {
    title: 'Регистрация',
    link: '/register'
  }
]

const ITEMS_FOR_USERS = [
  {
    title: 'Новости',
    link: '/home'
  },
  {
    title: 'Моя квартира',
    link: '/flat'
  }
]

export default class Menu extends React.Component {
  render() {
    const items = this.context.loggedIn ? ITEMS_FOR_USERS : ITEMS_FOR_VISITORS
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

Menu.contextTypes = {
  loggedIn: React.PropTypes.bool
}
