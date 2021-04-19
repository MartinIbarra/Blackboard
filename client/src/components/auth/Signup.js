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
            const res = await fetch('http://localhost:5000/signup', {
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
            <div className="row">
                <h2>Signup</h2>
                <form className="col col-12" onSubmit={submitHandler}>
                    <div className="mb-3">
                        <input id="name" type="text" className="validate form-control" value={name} onChange={e => setName(e.target.value)} />
                        <div className="name error red-text">{nameError}</div>
                        <label htmlFor="name">Name</label>
                    </div>
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
                    <button className="btn btn-primary"> Sign up </button>
                </form>
            </div>
        </div>
    )
}

export default Signup