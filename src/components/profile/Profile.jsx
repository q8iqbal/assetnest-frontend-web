import React  from 'react';
import {Button , Row, Col} from 'react-bootstrap'
import {getUser, logout } from '../../utils/auth'
import {useHistory} from "react-router-dom"
import './Profile.scss'
import {BASE_URL} from '../../constants/urls'
import ProfileImage from '../../assets/icons/profile.png'

function Profile() {
    const history = useHistory()
    const user = getUser()
    const handleLogout = ()=>{
        logout()
        history.push('/login')
    }
    
    return (
        <div className="w-100 mx-md-5 mt-5 mx-3 profile-wrapper" >
            <Row><h1 className="text-capitalize"><span className="text-primary">{user.role}</span> | {user.name}</h1></Row>
            <Row sm={2} xs={1} className="mt-4">
                <Col sm={4} md={3} lg={2} className="d-flex justify-content-center">
                {
                    user.image == '' ? (
                        <img src={ProfileImage} className="rounded-circle profile-image float-left mr-3" alt="icon admin"/>
                    ) : (
                        <img src={BASE_URL + user.image} className="rounded-circle profile-image float-left mr-3" alt="profile picture"/>
                    )
                }
                </Col>

                <Col sm={8} md={9} lg={10}   className="bg-white rounded py-3 mt-4 mt-lg-0 shadow">
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
                        <div className="row mb-2 no-gutters d-flex justify-content-end">
                            <Button variant="danger" className="font-weight-bold" onClick={handleLogout}>Logout</Button>
                        </div> 
                </Col>
            </Row>
        </div>
    );
}

export default Profile;
