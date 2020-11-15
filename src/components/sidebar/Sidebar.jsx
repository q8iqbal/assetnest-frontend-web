import { Navbar, Button, Dropdown} from "react-bootstrap"
import React , {useState}from 'react'
import { Link, useLocation , useHistory} from "react-router-dom"
import {FaBars} from "react-icons/fa"
import Logo from "./header_sidebar.png"
import { logout } from "../../utils/auth"
import "./Sidebar.scss"

export default function Sidebar(props) {
    const history = useHistory();
    const [sidebar, setSidebar] = useState(false)
    const location = useLocation().pathname
    const [sidebarItem, setSidebarItem] = useState(()=>{
        let idx = 0
        props.route.map((value,index) => {
            if(value.path === location){
                idx = index
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

    const handleLogout = () => {
        logout()
        history.push('/login')
    }

    const handleProfile = () => {
        setSidebarItem([false, false, false])
    }
    

    return (
        <div className="d-flex wrapper w-100 h-100" onClick={()=>{if(sidebar){handleCLick()}}} >
            <div className={"bg-light border-right sidebar-wrapper d-lg-flex flex-column " + (sidebar ? " showed" : " hidden")} onClickCapture={handleCLick} >
                <Link to="/home">
                    <img src={Logo} alt="logo bambang" className="app-logo mb-3  mt-4 px-3 mx-auto" style={{width:"20em", height:"auto"}} />
                </Link>
                <div className="list-group item-group text-left mt-5">
                        {props.route.map((value,idx) => (
                            <Link hidden={value.hidden} onClick={getSelectedItem.bind(this, idx)} to={{ pathname: value.to , state:idx}} key={idx} className={"py-3 pr-5 pl-5 my-2  list-group-item-action "+(sidebarItem[idx] ? "bg-primary text-light" : "bg-light text-dark")}>{value.name}</Link>
                        ))}
                </div>
            </div>

            <div className="page-wrapper">
                <Navbar bg="primary" variant="dark" className="" style={{height:"10%"}}>
                    <Button onClick={handleCLick} className="button-sidebar"><FaBars/></Button>
                    <Navbar.Brand className="ml-2 navbar-font"> {props.companyName} </Navbar.Brand>
                        <Dropdown className="ml-auto">
                            <Dropdown.Toggle className="text-light">
                                <img src={props.userImage} alt="user" className="rounded-circle mr-2" width="30rem" height="30rem"/>
                                <span className="d-none d-md-inline button-text"> {props.userName} </span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu align="left">
                                <Dropdown.Item onClick={handleProfile}><Link to="/home/profile" className="text-decoration-none text-dark">Profile</Link></Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                </Navbar>
                <div id="page-content" className="d-flex overflow-auto" style={{backgroundColor:"#f9f9f9", height:"90%"}}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}
