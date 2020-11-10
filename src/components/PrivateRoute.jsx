import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../utils/auth";

export default function PrivateRoute({component : Component, ...rest}) {
    return (
        <Route
            {...rest}
            render={props => isLogin()? <Component {...props} /> : <Redirect to="/login"/>}
        />
    )
}
