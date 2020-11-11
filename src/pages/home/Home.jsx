import React from 'react'
import Sidebar from "../../components/sidebar/Sidebar"
import { Switch, Route, Redirect } from 'react-router-dom'
import { USER_ROUTE } from '../../Routes'
import PrivateRoute from '../../components/PrivateRoute'
import Error from "../../components/404/Error"


export default function Home() {


    return (
        <>
            <Sidebar Route={USER_ROUTE} >
                <Switch>
                    {
                        USER_ROUTE.map( value => {
                            return (
                                <PrivateRoute
                                key={value.name}
                                component={value.component}
                                path={value.path}
                                exact={value.exact}/>
                            )
                        })
                    }
                    <Route component={Error} />
                    <Redirect to="/home/" />
                </Switch>
            </Sidebar>
        </>
    )
}
