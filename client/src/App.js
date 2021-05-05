import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { UserContext } from './UserContext'
import Home from './components/home/Home'
import Navbar from './components/layout/Navbar'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Blackboard from './components/blackboard/Blackboard'
import errorPage from './components/errors/errorPage'
import './styles/App.scss'

function App() {

  	const [ user, setUser ] = useState(null)

	useEffect(() => {
		const verifyUser = async () => {
			let url
			process.env.NODE_ENV === 'production'
				? url = process.env.REACT_APP_API_URL_PROD
				: url = process.env.REACT_APP_API_URL
			try{
				const res = await fetch(`${url}/verifyuser`, {
					credentials: 'include',
					headers: { 'Content-Type': 'application/json' },
				})
				const data = await res.json()
				setUser(data)
			} catch(error){
				console.log(error)
			}
		
		}
		verifyUser()

	}, [])

  	return (
    	<Router>
      		<div className="App">
        		<UserContext.Provider value={{user, setUser}}>
					<Navbar />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/room/:room_id/:room_name" component={Blackboard} />
						<Route exact path="/signup" component={Signup} />
						<Route exact path="/login" component={Login} />
						<Route path="*" component={errorPage} />
					</Switch>
        		</UserContext.Provider>
      		</div>
    	</Router>
  	);
}

export default App;
