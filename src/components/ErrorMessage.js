import React from 'react'

const ErrorMessage = ({ error }) => (
    <div>
        {error.toString()}
    </div>
)

export { ErrorMessage as default }