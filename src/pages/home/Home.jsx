import React from 'react'
import Sidebar from "../../components/sidebar/Sidebar"
import { Switch, Route } from 'react-router-dom'
import { USER_ROUTE } from '../../Routes'
import PrivateRoute from '../../components/PrivateRoute'
import PublicRoute from '../../components/PublicRoute'
import Error from "../../components/404/Error"


export default function Home() {


    return (
        <>
            <Sidebar Route={USER_ROUTE} >
                <Switch>

                    //page-content
                    {
                        USER_ROUTE.map( value => {
                            return (
                                <PublicRoute
                                key={value.name}
                                component={value.component}
                                path={value.path}
                                exact={value.exact}/>
                            )
                        })
                    }
                    <Route component={Error} />
                </Switch>
            </Sidebar>
        </>
    )
}
