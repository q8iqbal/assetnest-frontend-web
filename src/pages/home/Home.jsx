import React from 'react'
import Sidebar from "../../components/sidebar/Sidebar";

import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from "../../components/dashboard/Dashboard";
import History from "../../components/history/History";
import Asset from "../../components/asset/Asset";


export default function Home() {
    return (
        <>
        <Sidebar >
            <Switch>
                <Route exact key="0" path="/home/dashboard" render={Dashboard}/>
                <Route exact key="1" path="/home/asset"   render={Asset}/>
                <Route exact key="2" path="/home/history"  render={History}/>
                <Redirect to="/home/dashboard" />
            </Switch>
        </Sidebar>
        </>
    )
}
