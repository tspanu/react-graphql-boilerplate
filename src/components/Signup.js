import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { AUTH_TOKEN } from '../utils/constants'
import AuthForm from './AuthForm'

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($data:CreateUserInput!) {
    createUser(data: $data) {
      token
      user {
        id
        username
        email
      }
    }
  }
`

export default class Signup extends Component {

    saveUserData = ({ createUser }) => {
        localStorage.setItem(AUTH_TOKEN, createUser.token)
        this.props.history.replace('/')
    }

    render() {
        return (
            <div className="component">
                <div className="content-container">
                    <div className="component__content">
                        <div>
                            <h3>
                                Have an account? <Link to="/login" className="button--link">Log in</Link>
                            </h3>
                            < Mutation
                                mutation={CREATE_USER_MUTATION}
                                onCompleted={data => this.saveUserData(data)}
                            >
                                {(createUser) => (
                                    <AuthForm isLogin={false} onSubmit={(user) => {
                                        createUser({ variables: { data: user } })
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