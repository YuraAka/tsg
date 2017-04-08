import React from 'react'
import ApiClient from '../service/api_client'
import { browserHistory } from 'react-router'

class WaterRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.date}</td>
        <td>{this.props.cold}</td>
        <td>{this.props.hot}</td>
      </tr>
    )
  }
}

class WaterInput extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.date}</td>
        <td><input placeholder='cold' onChange={this.props.onCold}/></td>
        <td><input placeholder='hot' onChange={this.props.onHot} /></td>
        <td><button type='button' onClick={this.props.onSave}>Сохранить</button></td>
      </tr>
    )
  }
}

class WaterStats extends React.Component {
  constructor() {
    super()
    this.state = {
      saved: false,
      error: false,
      history: []
    }
  }

  componentDidMount() {
    // load data from server
    ApiClient.loadWater({
      onSuccess: (history) => {
        this.setState({
          history: history
        })
      }
    })
  }

  render() {
    let hot, cold
    let onHot = ev => {
      hot = ev.target.value
    }

    let onCold = ev => {
      cold = ev.target.value
    }

    let onSave = () => {
      ApiClient.sendWater(
        {
          onSuccess: (ans) => {
            this.setState({
              saved: true
            })
            console.info('now is ', ans.now)
          },
          onFail: () => {
            this.setState({
              error: true
            })
          }
        },
        {
          hot: hot,
          cold: cold
        }
      )
    }

    return (
      <div>
        <div>Показания за воду</div>
        <table>
          <thead>
            <WaterRow date='Месяц' cold='Холодная' hot='Горячая'/>
          </thead>
          <tbody>
            {
              this.state.history.map(row => {
                return <WaterRow key={row.id} date={row.date} cold={row.cold} hot={row.hot}/>
              })
            }
            <WaterInput date='Апрель 2017' onHot={onHot} onCold={onCold} onSave={onSave}/>
          </tbody>
        </table>
        {this.state.saved && (<div>Спасибо, честный гражданин</div>)}
        {this.state.error && (<div>Что-то пошло не так</div>)}
      </div>
    )
  }
}

export default class FlatPage extends React.Component {
  _logout() {
    ApiClient.logout()
    browserHistory.push('/')
  }

  render() {
    return (
      <div>
        <div>myflat</div>
        <button onClick={this._logout.bind(this)}>Logout</button>
        <WaterStats/>
      </div>
    )
  }
}
