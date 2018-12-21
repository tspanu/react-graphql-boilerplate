import React from 'react'
import { Query, ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'

const getProfile = gql`
    query {
        me {
            username
            email
        }
    }
`

const User = () => (
    <div className="component">
        <div className="content-container">
            <Query query={getProfile}>
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>
                    if (error) return <p>Not logged in</p>

                    return (
                        <div className="component__content">
                            <div>
                                <h3 className="list-item__title">{data.me.username}</h3>
                                <span className="list-item__sub-title">{data.me.email}</span>
                            </div>
                            <ApolloConsumer>
                                {client => (
                                    <button className="button" onClick={() => {
                                        client.writeData({ data: { isLoggedIn: false } })
                                        localStorage.clear()
                                    }}>Log out</button>
                                )}
                            </ApolloConsumer>
                        </div>

                    )
                }}
            </Query>
        </div>
    </div>
)

export default User