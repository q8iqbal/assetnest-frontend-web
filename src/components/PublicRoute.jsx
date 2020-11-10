import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../utils/auth";

export default function PublicRoute({component : Component, restricted ,...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => isLogin() && restricted ?(
                <Redirect to="/home"/>
            ):(
                <Component {...props}/>
            )
            }
        />
    )
}
