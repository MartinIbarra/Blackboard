import React, { useContext } from 'react'
import { UserContext } from '../../UserContext'

const Navbar = () => {

    const { user, setUser } = useContext(UserContext)

    const logout = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
                credentials: 'include',
            });
            const data = res.json();
            console.log('logout data', data)
            setUser(null)
        } catch (error) {
            console.log(JSON.stringify(error))
        }

    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Blackboard</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="d-flex" id="navbarScroll">
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/login">Login</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="#" onClick={logout}>Logout</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/signup">Signup</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
