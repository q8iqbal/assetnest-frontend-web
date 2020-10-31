import {Form, Button, FormControl} from 'react-bootstrap'
import { Link , useHistory} from 'react-router-dom';
import React from 'react';

import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import Logo from '../../assets/svg/assetnest-horizontal.svg'
import './Login.scss';
import {POST_LOGIN} from '../../constants/urls'



export default function Login() {
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
            //show warning email & password not found
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
            <div className="text-center shadow-lg bg-white py-5 px-3 px-sm-4 login-form d-flex flex-column justify-content-around align-items-center">

            <div>
                <h1>Welcome</h1>
                <p className="mt-3">Sign in to your company fixed<br/>
                asset management system</p>
            </div>

            <Form className="mx-auto" noValidate onSubmit={handleSubmit}>
                <Form.Group className="position-relative search-field">
                    <Form.Control
                    name="inputEmail"
                    value={values.inputEmail} 
                    type="email" 
                    placeholder="Email" 
                    className="h-auto"
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
                    className="h-auto"
                    onChange={handleChange}
                    isInvalid={!!errors.inputPassword}
                    />
                    <FormControl.Feedback type="invalid" tooltip>{errors.inputPassword}</FormControl.Feedback>
                </Form.Group>
                <Button type="submit" className="w-100 mb-3">
                    Sign In
                </Button>
                <p className="font-weight-light">Doesn't have account yet?<Link to="/">Register now</Link></p>
            </Form>

            <div className="app-logo">
                <img src={Logo} alt="logo bambang"/>
            </div>
        </div>
        )}
        </Formik>
    );
}
