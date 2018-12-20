import React from 'react'
import { Mutation, ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'

import SignupForm from './SignupForm'
import { AUTH_TOKEN } from '../utils/constants'

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

export default class Signup extends React.Component {
    render() {
        return (
            <ApolloConsumer>
                {client => (
                    < Mutation
                        mutation={CREATE_USER_MUTATION}
                        onCompleted={({ createUser }) => {
                            localStorage.setItem(AUTH_TOKEN, createUser.token)
                            client.writeData({ data: { isLoggedIn: true } })
                        }}
                    >
                        {(createUser) => (
                            <SignupForm signup={createUser} />
                        )}
                    </Mutation>
                )}
            </ApolloConsumer>
        )
    }
}