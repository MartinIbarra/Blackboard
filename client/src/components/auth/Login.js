import React, { useState, useContext } from 'react'
import { UserContext } from '../../UserContext'
import { Redirect } from 'react-router-dom'

const Login = () => {

    const { user, setUser } = useContext(UserContext)

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ emailError, setEmailError ] = useState('')
    const [ passwordError, setPasswordError ] = useState('')

    const submitHandler = async e => {
        e.preventDefault()
        setEmailError('')
        setPasswordError('')

        try{
            const res = await fetch('https://blackboard-application.herokuapp.com/login', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await res.json()
            console.log(data)
            if(data.errors){
                setEmailError(data.errors.email)
                setPasswordError(data.errors.password)
            }
            if(data.user){
                setUser(data.user)
            }
        } catch(err){
            console.log(err)
        }
    }
    if(user){
        return <Redirect to="/" />
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <h2>Login</h2>
                <form className="col-12" onSubmit={submitHandler}>
                    <div className="mb-3">
                        <input id="email" type="email" className="validate form-control" value={email} onChange={e => setEmail(e.target.value)} />
                        <div className="name error red-text">{emailError}</div>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="mb-3">
                        <input id="password" type="password" className="validate form-control" value={password} onChange={e => setPassword(e.target.value)} />
                        <div className="name error red-text">{passwordError}</div>
                        <label htmlFor="password">Password</label>
                    </div>
                    <button className="btn btn-primary"> Login </button>
                </form>
            </div>
        </div>
    )
}

export default Login