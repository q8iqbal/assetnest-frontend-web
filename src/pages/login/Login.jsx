import {Form, Button, FormControl, Alert, Modal} from 'react-bootstrap'
import { Link , useHistory} from 'react-router-dom'
import React, {useState} from 'react'
import { AiOutlineInfoCircle,AiFillQuestionCircle } from "react-icons/ai";
import Aou from "../../components/about_us/Aou"

import {Formik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import {login, setCompany} from '../../utils/auth'

import Logo from './assetnest-horizontal.svg'
import {POST_LOGIN, GET_COMPANY} from '../../constants/urls'

import './Login.scss';

import anButton from './an.png'
import wiButton from './wi.png'
import how from './how.png'


export default function Login() {
    const [show, setShow] = useState(false);
    const history = useHistory();

    // modal about us
    const [showAou, setShowAou] = useState(false);
    const handleClose = () => setShowAou(false);
    const handleShow = () => setShowAou(true);

    //modal how
    const [showHow, setShowHow] = useState(false);
    const handleCloseHow = () => setShowHow(false);
    const handleShowHow = () => setShowHow(true);

    const schema = Yup.object({
        inputEmail : Yup.string().email('invalid email').required('Required'),
        inputPassword : Yup.string().required('Required'),
    });

    const handleSubmit = (values) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
            
        const data = {
            "user": {
                "email" : values.inputEmail,
                "password" : values.inputPassword
            }
        }
        
        axios.post(POST_LOGIN, data, config)
        .then(response => {
            //save token to cookies and user to local storage
            const role = response.data.user.role
            if(role === "user"){
                setShow(true)
            }else{
                login(response.data)
                //get company data
                axios.get(GET_COMPANY,{headers : {'Authorization' : 'Bearer'+response.data.token}})
                .then(response => {
                    setCompany(response.data.data)
                    //change to dashboard
                    history.push("/home/")
                })
            }
        })
        .catch(errors => {
            setShow(true) // show error can't login
        });
    }   

    return(
        <Formik validateOnChange={false}
                validationSchema={schema} 
                onSubmit={values => handleSubmit(values)}
                initialValues={{
                    inputEmail: '',
                    inputPassword:'',
                }}>
        {({
            handleSubmit,
            handleChange,
            values,
            errors,
        })=> (
            <>
            <div className="login-page">
                <div className="text-center shadow-lg bg-white py-3 px-4 px-sm-4 login-form d-flex flex-column justify-content-around align-items-center">
                    <Alert show={show} variant="danger" onClose={() => setShow(false)} dismissible>
                        <Alert.Heading>Email and Password is invalid!</Alert.Heading>
                    </Alert>
                    <img src={Logo} alt="logo bambang" className="app-logo mt-md-5"/>
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className="position-relative search-field">
                            <Form.Control
                            name="inputEmail"
                            value={values.inputEmail} 
                            type="email" 
                            placeholder="Email" 
                            onChange={handleChange}
                            isInvalid={!!errors.inputEmail}
                            />
                            <FormControl.Feedback type="invalid" tooltip>{errors.inputEmail}</FormControl.Feedback>
                        </Form.Group>
                        <Form.Group className="position-relative">
                            <Form.Control 
                            name="inputPassword"
                            value={values.inputPassword} 
                            type="password" 
                            placeholder="Password"
                            onChange={handleChange}
                            isInvalid={!!errors.inputPassword}
                            />
                            <FormControl.Feedback type="invalid" tooltip>{errors.inputPassword}</FormControl.Feedback>
                        </Form.Group>
                        <Button type="submit" className="w-100 mb-3">
                            Sign In
                        </Button>
                    </Form>
                    <span className="mb-md-5"> 
                        <a href="http://intip.in/AssetNestAndroid" target="_blank"> 
                            <img src={anButton} alt="" loading="lazy" width="35%" height="auto"/> 
                        </a> 
                        <a href="http://intip.in/AssetNestDesktop" target="_blank"> 
                            <img src={wiButton} alt="" loading="lazy"  width="35%" height="auto"/> 
                        </a>
                    </span>
                </div>
                <span className="test">
                    <Button className="aou" onClick={handleShow}>
                        <AiOutlineInfoCircle/> <span className="hide">About us</span>
                    </Button>
                    <Button className="aou" onClick={handleShowHow}>
                        <AiFillQuestionCircle/> <span className="hide">How to use</span>
                    </Button>
                </span>
            </div>


            <Modal show={showAou} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>About Us</Modal.Title>
                </Modal.Header>
                <Modal.Body><Aou/></Modal.Body>
            </Modal>

            <Modal size='xl' show={showHow} onHide={handleCloseHow}>
                <Modal.Header closeButton>
                <Modal.Title>How to Use</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={how} style={{width:"-moz-available"}} />
                </Modal.Body>
            </Modal>
            </>
        )}
        </Formik>
    );
}
