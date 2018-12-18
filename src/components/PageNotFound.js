import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = ({ location }) => (
  <div className="content-container">
    <div className="component">
      <p>Sorry, no page found at {location.pathname}</p>
      <Link to="/">Go Home</Link>
    </div>
  </div>
)

export default PageNotFound
