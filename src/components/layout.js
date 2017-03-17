import React from 'react'

export default function Layout(props) {
    return (
        <div>
            <header>
                <p>Header</p>
            </header>
            {props.children}
            <footer>
                <p>Footer</p>
            </footer>
        </div>
    )
}
