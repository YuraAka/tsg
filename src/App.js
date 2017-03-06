import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    /*return (
      <div className="App">
        <Header/>
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
          {this.props.children}
        </div>
      </div>
    )
  }*/
    return (
      <div>
        hello
      </div>
    )
  }
}

class Login extends Component {
  render() {
    return <div>login</div>
  }
}

class Registration extends Component {
  render() {
    return <div>registration</div>
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

class Menu extends Component {
  render() {
    return (
    <div>
      <div>{this.props.items.map((item) => <a key={item.title} href={item.url}>{item.title}</a>)}</div>
    </div>
    )
  }
}

export default App;
