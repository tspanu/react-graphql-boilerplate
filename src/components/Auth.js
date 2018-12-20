import React from 'react'

import Login from './Login'
import Signup from './Signup'


export default class Auth extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            isSignup: props.isSignup && props.isSignup
        }
    }
    render() {
        const isSignup = this.state.isSignup
        return (
            <div className="component">
                <div className="content-container">
                    {isSignup ? <Signup /> : <Login />}
                    {isSignup ? <p>Have an account?</p> : <p>Don't have an account?</p>}
                    <button className="button--link" onClick={() => this.setState({ isSignup: !isSignup })}>{isSignup ? 'Log in' : 'Sign up'}</button>
                </div>
            </div>
        )
    }
}
