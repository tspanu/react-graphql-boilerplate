import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import WidgetItem from './WidgetItem'
import ErrorMessage from './ErrorMessage';

const getWidgets = gql`
    query {
        widgets {
            id
            text
        }
    }
`

const WigetList = () => (
    <div className="component">
        <div className="content-container">
            <Query query={getWidgets} fetchPolicy="network-only">
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>

                    if (error) return <ErrorMessage error={error} />

                    return (
                        <Fragment>
                            {data.widgets.length ? (
                                data.widgets.map((widget) => (
                                    <WidgetItem key={widget.id} {...widget} />
                                ))
                            ) : (
                                    <h3>No widgets saved</h3>
                                )}
                        </Fragment>
                    )
                }}
            </Query>
        </div>
    </div>
)

export default WigetList