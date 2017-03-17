import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'

const ACTIVE = { color: 'red' }

export const App = ({ children }) => (
  <div>
    <h1>APP!</h1>
    <ul>
      <li><Link      to="/index"      activeStyle={ACTIVE}>/index</Link></li>
      <li><Link      to="/about"      activeStyle={ACTIVE}>/about</Link></li>
    </ul>

    {children}
  </div>
)

export const Index = () => (
  <div>
    <h2>Index!</h2>
  </div>
)

export const About = () => (
  <div>
    <h2>About</h2>
  </div>
)