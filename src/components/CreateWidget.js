import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const CREATE_WIDGET_MUTATION = gql`
  mutation CreateWidgetMutation($data:CreateWidgetInput!) {
    createWidget(data: $data) {
      id
      text
    }
  }
`
const CreateWidget = () => (
    <div className="component">
        <div className="content-container">
            < Mutation mutation={CREATE_WIDGET_MUTATION}>
                {(createWidget) => (
                    <div>
                        <input
                            id="widget-name-input"
                            type="text"
                            className="text-input"
                            placeholder="Widget Name"
                        />
                        <button className="button" onClick={() => {
                            const data = {
                                text: document.getElementById("widget-name-input").value
                            }
                            createWidget({ variables: { data } })
                        }}
                        >Create Widget</button>
                    </div>
                )}
            </Mutation>
        </div>
    </div>
)

export { CreateWidget as default }