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
        <td><input type='number' value={this.props.cold} onChange={this.props.onCold}/></td>
        <td><input type='number' value={this.props.hot} onChange={this.props.onHot} /></td>
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
      history: [],
      currentTitle: '',
      currentHot: '',
      currentCold: ''
    }
  }

  componentDidMount() {
    // load data from server
    ApiClient.loadWater({
      onSuccess: (data) => {
        let history = []
        for (let record of data) {
          if (record.current) {
            this.setState({currentTitle: record.date.title})
            this.setState({currentHot: record.hot})
            this.setState({currentCold: record.cold})
          } else {
            history.push(record)
          }
        }

        this.setState({
          history: history
        })
      }
    })
  }

  onInput(field) {
    return function (ev) {
      this.setState({[field]: ev.target.value})
    }
  }

  onSave() {
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
        hot: this.state.currentHot,
        cold: this.state.currentCold
      }
    )
  }

  render() {
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
                return <WaterRow key={row.date.id} date={row.date.title} cold={row.cold} hot={row.hot}/>
              })
            }
            <WaterInput
              date={this.state.currentTitle}
              onHot={this.onInput('currentHot').bind(this)} 
              onCold={this.onInput('currentCold').bind(this)} 
              onSave={this.onSave.bind(this)}
              cold={this.state.currentCold}
              hot={this.state.currentHot}
            />
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
