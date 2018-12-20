import React, { Fragment } from "react"
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Dashboard from '../components/Dashboard'
import Header from '../components/Header'

const Router = () => (
    <BrowserRouter>
        <Fragment>
            <Header />
            <Switch>
                <Route component={Dashboard} />
            </Switch>
        </Fragment>
    </BrowserRouter>
)

export default Router