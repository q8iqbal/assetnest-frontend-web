import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import Pencil from '../../assets/icons/edit.svg'
import {getUser } from '../../utils/auth.js'
import { getCookie } from '../../utils/auth'
import axios from 'axios'
import './Profile.scss'
import {BASE_URL} from '../../constants/urls'

function Profile(props) {
    // console.log(JSON.parse(localStorage.getItem("USER")));
    const id = JSON.parse(localStorage.getItem("USER")).id;
    // console.log(id);
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(getUser)
    },[]);
    
    axios.defaults.headers.common['Authorization']='Bearer'+getCookie();

    return (
        <div>
            <h1><span className="text-primary">{user.role}</span> | {user.name}</h1>
            {
                user.image == null ? (
                    <img src={BASE_URL + user.image} className="rounded-circle profile-image float-left mr-3" alt="icon admin"/>
                ) : (
                    <img src={BASE_URL + user.image} className="rounded-circle profile-image float-left mr-3" alt="icon admin"/>
                )
            }
            <div className="user-info rounded p-3">
                <Button type="submit" className="btn-pencil float-right">
                    <img src={Pencil} alt=""/>
                </Button>
                <div className="w-75">
                    <div className="row mb-2 no-gutters">
                        <h5 className="col-md-3 col-sm-6 label">Fullname</h5>
                        <h5 className="col-md-9 col-sm-6">{user.name}</h5>
                    </div>
                    <div className="row mb-2 no-gutters">
                        <h5 className="col-md-3 col-sm-6 label">Role</h5>
                        <h5 className="col-md-9 col-sm-6">{user.role}</h5>
                    </div>
                    <div className="row mb-2 no-gutters">
                        <h5 className="col-md-3 col-sm-6 label">Email</h5>
                        <h5 className="col-md-9 col-sm-6">{user.email}</h5>
                    </div>  
                </div>
            </div>
        </div>
    );
}

export default Profile;
