import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Canvas from './components/Canvas'
import Home from './components/Home'
// import './styles/main.scss'

const App = () => {
    return (
        <Router>
            <Route path="/" exact component={Home} />
            <Route path="/canvas/:roomName" component={Canvas} />
        </Router>
    )
}

export default App