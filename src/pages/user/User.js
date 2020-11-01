import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Icon from '../../assets/pictures/icon.png'
import Logo from '../../assets/pictures/logo_horizontal.png'
import Pencil from '../../assets/pictures/pencil.png'
import Foto from '../../assets/pictures/foto.png'
import Panah from '../../assets/pictures/panah.png'
import './User.scss';

function User(props) {
    return (
        <div>
            
            <div class="sidenav">
                <div className="app-logo">
                    <img src={Logo} alt="logo"/>
                </div>
                <a href="#dashboard">Dashboard</a>
                <a href="#asset">Asset</a>
                <a href="#history">History</a>
            </div>

            <div class="navbar">
                <div>
                    <span className="company-name">{props.companyName}</span>
                </div>
                <div className="app-foto">
                    <img src={Foto} alt="foto admin"/>
                </div>
                <div>
                    <span className="admin-name">{props.adminName}</span>
                </div>
                <div className="panah">
                    <img src={Panah} alt="panah"/>
                </div>
            </div>

            <div class="main">
                <div>
                    <h1><span className="text-primary">Admin</span> | Maulida Lumina</h1>
                </div>
                
                <div className="app-icon">
                    <img src={Icon} alt="icon admin"/>
                </div>

                <div className="user-data">
                    <table>
                        <tr>
                            <td>
                                <h5>Full Name</h5>
                            </td>
                            <td>
                                <h5>: Maulida Lumina</h5>
                            </td> 
                            <td>
                                <div>
                                    <img src={Pencil} alt="pencil" className="pencil"/>    
                                </div>
                            </td>             
                        </tr>
                        
                        <tr>
                            <td>
                                <h5>Role</h5>
                            </td>
                            <td>
                                <h5>: Admin</h5>                                                                    </td>
                            </tr>
                        
                        <tr>
                            <td>
                                <h5>Email</h5>
                            </td>
                            <td>
                                <h5>: trickstar_candina@rocketmail.com</h5>
                            </td> 
                        </tr>
                    </table>                        
                    <Button type="submit" className="log-btn">Logout</Button>
                </div>
            </div>
        </div>
    );
}

export default User;