import React from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { AUTH_TOKEN } from '../utils/constants'

const getProfile = gql`
    query {
        me {
            id
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
                            <Link to="/" className="button" onClick={() => {
                                localStorage.removeItem(AUTH_TOKEN)
                            }}>Log out</Link>
                        </div>
                    )
                }}
            </Query>
        </div>
    </div>
)

export default User