import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import WidgetItem from './WidgetItem'

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
                <Query query={getWidgets}>
                    {({ loading, error, data }) => {
                        if (loading) return <p>Loading...</p>

                        if (error) return <p>Not logged in</p>

                        if (data.widgets.length === 0){
                           return <h3>No widgets saved</h3>
                        }
                        
                        return data.widgets.map((widget) => (
                            <WidgetItem key={widget.id} {...widget} />
                        ))
                    }}
                </Query>
        </div>
    </div>
)

export default WigetList