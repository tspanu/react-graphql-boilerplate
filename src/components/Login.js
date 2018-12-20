import React from 'react'
import { Mutation, ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'

import LoginForm from './LoginForm'
import { AUTH_TOKEN } from '../utils/constants'

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

export default class Login extends React.Component {
    render() {
        return (
            <ApolloConsumer>
                {client => (
                    < Mutation
                        mutation={LOGIN_MUTATION}
                        onCompleted={({ login }) => {
                            localStorage.setItem(AUTH_TOKEN, login.token)
                            client.writeData({ data: { isLoggedIn: true } })
                        }}
                    >
                        {(login) => (
                            <LoginForm login={login} />
                        )}
                    </Mutation>
                )}
            </ApolloConsumer>
        )
    }
}