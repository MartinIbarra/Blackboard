import React, { useState, useContext } from 'react'
import { UserContext } from '../../UserContext'
import { Redirect } from 'react-router-dom'

const Signup = () => {

    const { user, setUser } = useContext(UserContext)
    
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ nameError, setNameError ] = useState('')
    const [ emailError, setEmailError ] = useState('')
    const [ passwordError, setPasswordError ] = useState('')

    const submitHandler = async e => {
        e.preventDefault()
        setNameError('')
        setEmailError('')
        setPasswordError('')

        try{
            const res = await fetch('https://blackboard-application.herokuapp.com/signup', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ name, email, password }),
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await res.json()
            console.log(data)
            if(data.errors){
                setEmailError(data.errors.email)
                setNameError(data.errors.name)
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
                        <input id="name" type="text" placeholder="Name" spellCheck="false" className="input-form" value={name} onChange={e => setName(e.target.value)} />
                        <div className="error">{nameError}</div>
                    </div>
                    <div className="mb-3">
                        <input id="email" type="email" placeholder="Email" spellCheck="false" className="input-form" value={email} onChange={e => setEmail(e.target.value)} />
                        <div className="error">{emailError}</div>
                    </div>
                    <div className="mb-3">
                        <input id="password" type="password" placeholder="Password" className="input-form" value={password} onChange={e => setPassword(e.target.value)} />
                        <div className="error">{passwordError}</div>
                    </div>
                    <button className="btn"> Sign up </button>
                </form>
            </div>
        </div>
    )
}

export default Signup