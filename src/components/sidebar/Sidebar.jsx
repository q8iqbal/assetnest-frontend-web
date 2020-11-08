import { Navbar, Button, Dropdown} from "react-bootstrap"
import React , {useState}from 'react'
import { Link, useLocation } from "react-router-dom"
import {FaBars} from "react-icons/fa"
import Logo from "./header_sidebar.png"
import "./Sidebar.scss"

export const USER_ROUTE = [
    {
        name : "Dashboard",
        path : "/home/dashboard",
    },
    {
        name : "Asset",
        path : "/home/asset",
    },
    {
        name : "History",
        path : "/home/history",
    }
]


export default function Sidebar(props) { 
    const [sidebar, setSidebar] = useState(false)
    const location = useLocation().pathname
    const [sidebarItem, setSidebarItem] = useState(()=>{
        let idx = null
        USER_ROUTE.map((value,index) => { 
            if(value.path === location){
                idx = index
            }else if(location === "/home/" || location === "/home"){
                idx = 0
            }
        })
        let newData = [false,false,false]
        newData[idx] = true
        return newData
    })

    const getSelectedItem = (idx) =>{
        let newData = [false,false,false]
        newData[idx] = true
        setSidebarItem(newData) 
    }

    const handleCLick = () => {
        setSidebar(!sidebar)
    }

    const clearSelectedClick = ()=> {
        setSidebarItem([false,false,false])
    }

    return (
        <div className="d-flex wrapper">
            <div className={"bg-light border-right sidebar-wrapper d-flex flex-column   " + (sidebar ? " showed" : " hidden")}>
                <img src={Logo} alt="logo bambang" className="app-logo mb-3  mt-4 px-3 mx-auto" style={{width:"21rem", height:"auto"}} />
                <div className="list-group item-group text-left mt-5">
                        {USER_ROUTE.map((value,idx) => (
                            <Link onClick={getSelectedItem.bind(this, idx)} to={{pathname:value.path , state:idx}} key={idx} className={"py-3 pr-5 pl-5 my-2  list-group-item-action "+(sidebarItem[idx] ? "bg-primary text-light" : "bg-light text-dark")}>{value.name}</Link>
                        ))}
                </div>
            </div>

            <div className="page-wrapper">
                <Navbar bg="primary" variant="dark" className="py-3">
                    <Button onClick={handleCLick} className="button-sidebar"><FaBars/></Button>
                    <Navbar.Brand className="ml-2 navbar-font">Nama Perusahaan</Navbar.Brand>
                        <Dropdown className="ml-auto">
                            <Dropdown.Toggle className="text-light">
                                <img src="https://source.unsplash.com/random" alt="user picture" className="rounded-circle mr-2" width="30rem" height="30rem"/>
                                <span className="d-none d-md-inline button-text">Iqbal Nur I</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                <Dropdown.Item href="">Profile</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="">Sign Out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                </Navbar>
                <div id="page-content">
                    {props.children}
                </div>
            </div>
        </div>
    )
}
