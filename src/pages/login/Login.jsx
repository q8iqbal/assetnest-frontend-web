import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './Login.scss';
import Logo from '../../assets/svg/assetnest-horizontal.svg'
import { Link } from 'react-router-dom';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const schema = Yup.object({
        inputEmail : Yup.string().email('invalid email').required('Required'),
        inputPassword : Yup.string().required('Required'),
    });

    return (<Formik validationSchema={schema} 
                    onSubmit={values => {console.log(values)}}
                    initialValues={{
                        inputEmail: '',
                        inputPassword:'',
                    }}
            >
        {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
        })=> (
            <div className="text-center shadow-lg bg-white py-5 px-3 px-sm-4 login-form d-flex flex-column justify-content-around align-items-center">
            <div>
                <h1>Welcome</h1>
                <p className="mt-3">Sign in to your company fixed<br/>
                asset management system</p>
            </div>
            <Form className="mx-auto" noValidate onSubmit={handleSubmit}>
                <Form.Group className="d-flex search-field ">

                    <Form.Control
                    id="inputEmail"
                    name="inputEmail"
                    value={values.inputEmail} 
                    type="email" 
                    placeholder="Email" 
                    className="h-auto" 
                    onChange={handleChange}
                    isInvalid={!!errors.inputEmail}
                    />

                </Form.Group>

                <Form.Group className="d-flex search-field ">

                    <Form.Control 
                    name="inputPassword"
                    value={values.inputPassword} 
                    type="password" 
                    placeholder="Password" 
                    className="h-auto" 
                    onChange={handleChange}
                    isInvalid={!!errors.inputPassword}
                    />

                </Form.Group>

                <Button type="submit" className="w-100 mb-3">
                    Sign In
                </Button>

                <p  className="font-weight-light">Doesn't have account yet? 
                    <Link to="/">Register now</Link>
                </p>
            </Form>
            <div className="app-logo">
                <img src={Logo} alt="logo bambang"/>
            </div>
        </div>
        )}

    </Formik>);
}
