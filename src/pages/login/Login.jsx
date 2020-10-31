import {Form, Button, FormControl, Alert} from 'react-bootstrap'
import { Link , useHistory} from 'react-router-dom';
import React, {useState} from 'react';

import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import Logo from './assetnest-horizontal.svg'
import './Login.scss';
import {POST_LOGIN} from '../../constants/urls'



export default function Login() {
    const [show, setShow] = useState(false);
    const history = useHistory();

    const schema = Yup.object({
        inputEmail : Yup.string().email('invalid email').required('Required'),
        inputPassword : Yup.string().required('Required'),
    });

    const handleSubmit = (values) => {
        let config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
            
        let data = {
            "user": {
                "email" : values.inputEmail,
                "password" : values.inputPassword
            }
        }

        axios.post(POST_LOGIN, data, config)
        .then(response => {
            //save cookies storage and local storage
            console.log(response);
        })
        .catch(errors => {
            setShow(true) // show error can't login
            console.warn(errors);
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
            <div className="text-center shadow-lg bg-white py-3 px-4 px-sm-4 login-form d-flex flex-column justify-content-around align-items-center">
            
            <Alert show={show} variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Email and Password is invalid!</Alert.Heading>
            </Alert>

            <img src={Logo} alt="logo bambang" className="app-logo mt-md-4"/>

            <Form noValidate onSubmit={handleSubmit} className="mb-md-5">
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
                    <Link className="float-right">Forgot Password</Link>
                </Form.Group>
                <Button type="submit" className="w-100 mb-3">
                    Sign In
                </Button>
                
            </Form>
        </div>
        )}
        </Formik>
    );
}
