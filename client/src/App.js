import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { UserContext } from './UserContext'
import Home from './components/home/Home'
import Navbar from './components/layout/Navbar'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Blackboard from './components/blackboard/Blackboard'
import './styles/App.scss'

function App() {

  	const [ user, setUser ] = useState(null)

	useEffect(() => {
		const verifyUser = async () => {
			try{
				const res = await fetch('https://blackboard-application.herokuapp.com/verifyuser', {
					credentials: 'include',
					headers: { 'Content-Type': 'application/json' }
				})
				const data = await res.json()
				setUser(data)
			} catch(error){
				console.log(error)
			}
		
		}
		verifyUser()

	})

  	return (
    	<Router>
      		<div className="App">
        		<UserContext.Provider value={{user, setUser}}>
					<Navbar />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/room/:room_id/:room_name" component={Blackboard} />
						<Route path="/signup" component={Signup} />
						<Route path="/login" component={Login} />
					</Switch>
        		</UserContext.Provider>
      		</div>
    	</Router>
  	);
}

export default App;
