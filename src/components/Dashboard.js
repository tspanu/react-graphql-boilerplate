import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import CreateWidget from './CreateWidget'
import Auth from './Auth'
import Profile from './Profile'
import WidgetList from './WidgetList'

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`

const Dashboard = () => (
    <Query query={IS_LOGGED_IN}>
        {({ data }) => (data.isLoggedIn ?
            <Fragment>
                <Profile />
                <CreateWidget />
                <WidgetList />
            </Fragment>
            :
            <Auth />
        )}
    </Query>
)

export { Dashboard as default }