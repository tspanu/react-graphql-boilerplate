import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const DELETE_WIDGET_MUTATION = gql`
  mutation DeleteWidgetMutation($id:ID!) {
    deleteWidget(id: $id) {
      id
      text
    }
  }
`

const WidgetItem = ({ id, text }) => (
    <div className="component__content">
        <div className="list-item">
            <h3 className="list-item__title">{text}</h3>
            <span className="list-item__sub-title">ID: {id}</span>
        </div>
        <Mutation mutation={DELETE_WIDGET_MUTATION}>
            {(deleteWidget) => (
                <button className="button" onClick={() => {
                    deleteWidget({ variables: {id} })
                }}>Delete</button>
            )}
        </Mutation>
    </div>
)

export { WidgetItem as default }