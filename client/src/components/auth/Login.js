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
            const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
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
            <div className="row justify-content-center form-container">
                <form className="col-4" onSubmit={submitHandler} autoComplete="off">
                    <div className="mb-3">
                        <input id="email" type="email" placeholder="email" spellCheck="false" className="input-form" value={email} onChange={e => setEmail(e.target.value)} />
                        <div className="error">{emailError}</div>
                    </div>
                    <div className="mb-3">
                        <input id="password" type="password" placeholder="password" className="input-form" value={password} onChange={e => setPassword(e.target.value)} />
                        <div className="error">{passwordError}</div>
                    </div>
                    <button className="btn"> Login </button>
                </form>
            </div>
        </div>
    )
}

export default Login