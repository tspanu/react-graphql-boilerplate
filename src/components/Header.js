import React from 'react'
import { Link } from 'react-router-dom'
import { AUTH_TOKEN } from '../utils/constants'

const authToken = localStorage.getItem(AUTH_TOKEN)

const Header = ({ startLogout }) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <Link to="/" className="header__title" >
                    <h1>Boilerplate</h1>
                </Link>
                {authToken ? (
                    <Link to="/profile" className="button--link">Profile</Link>
                ) : (
                    <Link to="/login" className="button--link">Log in</Link>
                )}
            </div>
        </div>
    </header>
)

export default Header