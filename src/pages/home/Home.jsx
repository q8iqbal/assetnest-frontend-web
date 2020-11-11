import React from 'react'
import Sidebar from "../../components/sidebar/Sidebar"
import { Switch, Route, Redirect } from 'react-router-dom'
import { USER_ROUTE } from '../../Routes'
import PrivateRoute from '../../components/PrivateRoute'
import Error from "../../components/404/Error"
import { getUser, getCompany } from "../../utils/auth"
import { BASE_URL } from "../../constants/urls";



export default function Home() {
    const userData = getUser()
    const companyData = getCompany()

    return (
        <>
            <Sidebar route={USER_ROUTE} userName={userData.name} userImage={BASE_URL+userData.image} companyName={companyData.name}>
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
                </Switch>
            </Sidebar>
        </>
    )
}
