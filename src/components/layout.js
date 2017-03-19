import React from 'react'
import Menu from './menu'

export default function Layout(props) {
    return (
        <div>
            <header>
                <p>Header123</p>
            </header>
            <Menu loggedIn={false}/>
            {props.children}
            <footer>
                <p>Footer</p>
            </footer>
        </div>
    )
}
