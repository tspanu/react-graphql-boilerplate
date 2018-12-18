import React, { Fragment } from 'react'
import CreateWidget from './CreateWidget'
import WidgetList from './WigetList'

const Dashboard = () => (
    <Fragment>
        <CreateWidget />
        <WidgetList />
    </Fragment>
)

export { Dashboard as default }