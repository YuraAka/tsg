import React from 'react'
import auth from '../auth'
import LoginPage from './login_page'

function Spinner(props) {
    return (
        <div>Loading</div>
    )
}

export default (Protectee) => {
    class Protector extends React.Component {
        constructor(props) {
            super()
            //setCookie('yuraaka', 'hello')
            console.info('PROCTECTOR CTOR')
            //this.state = { loggedIn: auth.loggedIn() }
            this.state = { loggedIn: false }
        }

        componentDidMount() {
            console.info('CONTEXT: ', this.context)
            this.unsubscribe = auth.subscribe(this._updateState.bind(this))
            if (!this.state.loggedIn) {
                console.info('TRANSITION')
                this.context.router.transitionTo('/login')
            }
        }

        componentWillUnmount() {
            console.info('PROTECTOR UNMOUNT')
            this.unsubscribe()
        }

        _updateState(loggedIn) {
            console.info('UPDATE STATE: ', loggedIn)
            this.setState({ loggedIn: loggedIn })
        }

        render() {
            console.info('PROTECTOR RENDER')
            if (this.state.loggedIn) {
                return <Protectee {...this.props}/>
            }
            
            return <LoginPage/>
        }
    }

    Protector.contextTypes = {
        router: React.PropTypes.object
    }

    return Protector
}