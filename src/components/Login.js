import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { AUTH_TOKEN } from '../utils/constants'
import AuthForm from './AuthForm'

const LOGIN_MUTATION = gql`
  mutation LoginMutation($data:LoginUserInput!) {
    login(data: $data) {
      token
      user {
        id
        username
        email
      }
    }
  }
`
export default class Login extends Component {
    saveUserData = ({ login }) => {
        localStorage.setItem(AUTH_TOKEN, login.token)
        this.props.history.replace('/')
    }

    render() {
        return (
            <div className="component">
                <div className="content-container">
                    <div className="component__content">
                        <div>
                            <h3>
                                Need an account? <Link to="/signup" className="button--link">Sign up</Link>
                            </h3>
                            < Mutation
                                mutation={LOGIN_MUTATION}
                                onCompleted={data => this.saveUserData(data)}
                            >
                                {(login) => (
                                    <AuthForm isLogin={true} onSubmit={(user) => {
                                        const data = {
                                            email: user.email,
                                            password: user.password
                                        }
                                        login({ variables: { data } })
                                    }}/>
                                )}
                            </Mutation>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
