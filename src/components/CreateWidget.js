import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import { GET_WIDGETS } from './WidgetList'

const CREATE_WIDGET_MUTATION = gql`
  mutation CreateWidgetMutation($data:CreateWidgetInput!) {
    createWidget(data: $data) {
      id
      text
    }
  }
`
const updateWidgetList = (cache, { data: { createWidget } }) => {
    const { widgets } = cache.readQuery({ query: GET_WIDGETS })
    cache.writeQuery({
        query: GET_WIDGETS,
        data: { widgets: widgets.concat([createWidget]) }
    })
}

const CreateWidget = () => (
    <div className="component">
        <div className="content-container">
            < Mutation mutation={CREATE_WIDGET_MUTATION} update={updateWidgetList}>
                {(createWidget) => (
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        createWidget({
                            variables: {
                                data: {
                                    text: e.target.elements.widget.value
                                }
                            }
                        })
                        e.target.elements.widget.value = ''
                    }}>
                        <input
                            name="widget"
                            type="text"
                            className="text-input"
                            placeholder="Widget Name"
                        />
                        <button className="button">Create Widget</button>
                    </form>
                )}
            </Mutation>
        </div>
    </div>
)

export { CreateWidget as default }