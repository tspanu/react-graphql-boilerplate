import React from "react"
import { Route, Switch } from 'react-router-dom'
import Dashboard from './Dashboard'
import Header from './Header'
import Login from './Login'
import PageNotFound from './PageNotFound'
import Profile from './Profile'
import Signup from './Signup'

const App = () => (
    <div>
        <Header />
        <Switch>
            <Route path="/" component={Dashboard} exact={true} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/signup' component={Signup} />
            <Route component={PageNotFound} />
        </Switch>
    </div>
)

export default App