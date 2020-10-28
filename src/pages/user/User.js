import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './User.scss';
import Logo from '../../assets/svg/assetnest-horizontal.svg'
import Icon from '../../assets/pictures/icon.png'
import { Link } from 'react-router-dom';

export default function User() {
    return (<div>
                <div>
                    <h1><span className="role"> Admin </span> | Maulida Lumina</h1>
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
                        </tr>

                        <tr>
                            <td>
                                <h5>Role</h5>
                            </td>
                            <td>
                                <h5>: Admin</h5>
                            </td>
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
            </div>);
}