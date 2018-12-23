import './styles/index.scss'
import 'normalize.css/normalize.css'
import React from 'react'
import ReactDOM from 'react-dom'

import { ApolloClient } from 'apollo-client'
import { ApolloLink, split } from 'apollo-link'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { createHttpLink } from 'apollo-link-http'
import { getMainDefinition } from 'apollo-utilities'
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context'
import gql from 'graphql-tag'

import Router from './routers/router'
import { AUTH_TOKEN } from './utils/constants'

const httpLink = createHttpLink({
    uri: 'http://localhost:4000',
})

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN)
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        console.log('Graphql Error')
    }

    if (networkError) {
        console.log('Network Error')
    }
})

const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000`,
    options: {
        reconnect: true,
        connectionParams: {
            authToken: localStorage.getItem(AUTH_TOKEN),
        },
    },
})

const link = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    ApolloLink.from([errorLink, authLink, httpLink])
)

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
    initializers: {
        isLoggedIn: () => !!localStorage.getItem(AUTH_TOKEN)
    },
    typeDefs
})

ReactDOM.render(
        <ApolloProvider client={client}>
            <Router />
        </ApolloProvider>,
    document.getElementById('root')
)