import React, { Fragment } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { GET_WIDGETS } from './WidgetList'

const DELETE_WIDGET_MUTATION = gql`
  mutation DeleteWidgetMutation($id:ID!) {
    deleteWidget(id: $id) {
      id
    }
  }
`
const updateWidgetList = (cache, { data: { deleteWidget } }) => {
    const { widgets } = cache.readQuery({ query: GET_WIDGETS })
    cache.writeQuery({
        query: GET_WIDGETS,
        data: { widgets: widgets.filter(({ id }) => id !== deleteWidget.id) }
    })
}

const WidgetItem = ({ id, text }) => (
    <div className="component__content">
        <div className="list-item">
            <h3 className="list-item__title">{text}</h3>
            <span className="list-item__sub-title">ID: {id}</span>
        </div>
        <Mutation mutation={DELETE_WIDGET_MUTATION} update={updateWidgetList}>
            {(deleteWidget) => (
                <button className="button" onClick={() => {
                    deleteWidget({
                        variables: { id }, optimisticResponse: {
                            __typename: "Mutation",
                            deleteWidget: {
                                __typename: "Widget",
                                id
                            }
                        }
                    })
                }}>Delete</button>
            )}
        </Mutation>
    </div>
)

export { WidgetItem as default }