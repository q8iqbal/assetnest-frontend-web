import React from 'react'
import Sidebar from "../../components/sidebar/Sidebar"
import { Switch, Route } from 'react-router-dom'
import { USER_ROUTE } from '../../Routes'
import PrivateRoute from '../../components/PrivateRoute'
import Error from "../../components/404/Error"
import { getUser, getCompany } from "../../utils/auth"
import { BASE_URL } from "../../constants/urls";
import ProfileImage from '../../assets/icons/profile.png'



export default function Home() {
    const userData = getUser()
    const companyData = getCompany()

    const image = userData.image === ''? ProfileImage : BASE_URL+userData.image

    return (
        <>
            <Sidebar route={USER_ROUTE} userName={userData.name} userImage={image} companyName={companyData.name}>
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
