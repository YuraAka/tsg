import React from 'react'
import {Link} from 'react-router'

const ACTIVE = { color: 'red' }

export default class Menu extends React.Component {
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
