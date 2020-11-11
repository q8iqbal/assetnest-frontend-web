import React, { useState } from 'react';
import { Formik, Field, ErrorMessage, FieldArray } from 'formik';
import { Form, Row, Col, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import './AssetForm.css';
import axios from 'axios';
import { POST_ASSET } from '../../../../constants/urls';
import FieldControl from '../asset-form/FieldControl';

const getCurrentDateString = () => {
    let currentDate = new Date();
    let month = currentDate.toLocaleString('en-us', { month: 'long'});
    let day = currentDate.getDate();
    let year = currentDate.getFullYear();
    let currentDateString = [month, `${day}, `, year].join(" ");

    return currentDateString;
};

const initialValues = {
    code: '',
    name: '',
    type: '',
    purchase_date: '',
    location: '',
    price: 0,
    image: undefined,
    fileAttachments: [undefined],
    note: '' 
};

const onSubmit = values => {
    let jsonConfig = {
        headers: {
            "Content-Type": "application/json",
            // "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODA4MFwvbG9naW4iLCJpYXQiOjE2MDQ2OTc1MzAsImV4cCI6MTYwNDcwMTEzMCwibmJmIjoxNjA0Njk3NTMwLCJqdGkiOiJuR25XeGJDa2RKVFM3bXJQIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.V8JQe4gSi7moLRcEJFIZmRU5zhgQh4LWYi2qdzWoyzI"
        }
    };

    let multipartConfig = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }
        
    let assetData = {
        "asset": {
            "code": values.code,
            "name": values.name,
            "type": values.type,
            "purchase_date": values.purchase_date,
            "location": values.location,
            "price": values.price,
            "note": values.note
        }
    };

    let assetImageData = values.image;
    let attachmentData = values.fileAttachments.filter(function(el) { return el; });
    // let imageFormData = new FormData();
    
    // formData.append("image", assetImageData);


    // axios.post(POST_LOGIN, loginData, jsonConfig)
    //     .then(login_response => {
    //         console.log(login_response);

    //         return login_response
    //     }).then(login_response => {
    //         jsonConfig = {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Athorization": `${login_response.token_type} ${login_response.token}`
    //             }
            
    //         }
    //         axios.post(POST_ASSET, assetData, jsonConfig)
    //             .then(postasset_response => {console.log(postasset_response))
    //     })
    axios.post(POST_ASSET, assetData, jsonConfig)
        .then(postasset_response => {
            console.log(postasset_response);
        })
        .catch(errors => {
            console.log(errors);
        });

    console.log(assetData, assetImageData, attachmentData);
};

const validationSchema = Yup.object({
    code: Yup.string().required("Required!"),
    name: Yup.string().required("Required!"),
    type: Yup.string().required("Required!"),
    purchase_date: Yup
        .date()
        .max(
            new Date(), 
            `Purchase date should be equal or earlier than today (${getCurrentDateString()})!`
        )
        .required('Required!'),
    location: Yup.string().required("Required!"),
    price: Yup
        .number()
        .required("Required!")
        .positive("Price should be positive values!"),
    image: Yup.mixed().nullable().notRequired(),
    fileAttachments: Yup.mixed().nullable().notRequired(),
    note: Yup.string().nullable().notRequired()
});

function AddAssetForm() {
    const typeOptions = [
        { value: '', key: '- Type -'},
        { value: 'elektronik', key: 'Electronics' },
        { value: 'kendaraan', key: 'Vehicles' },
        { value: 'dokumen', key: 'Documents'},
        { value: 'lain-lain', key: 'Others'}
    ];

    return (
        <div className="AssetForm">
        <h5 className="d-inline-block AssetForm_title">Add a New Asset</h5>
        <div className="AddAssetForm">
        <Formik 
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values => onSubmit(values)}
            validateOnChange={false} 
            >
            {formik => {
                console.log(formik);

                return (
                    <Form onSubmit={formik.handleSubmit} noValidate encType="multipart/form-data">
                        <FieldControl
                            control="input"
                            type="text"
                            label="Asset ID"
                            name="code"
                            placeholder="Asset ID"
                            onChange={formik.handleChange}
                            errorMessage={formik.errors.code} />
                        <FieldControl
                            control="input"
                            type="text"
                            label="Asset Name"
                            name="name"
                            placeholder="Asset Name"
                            onChange={formik.handleChange}
                            errorMessage={formik.errors.name} />
                        <FieldControl 
                            control="select"
                            options={typeOptions}
                            label="Type"
                            name="type"
                            onChange={formik.handleChange}
                            errorMessage={formik.errors.type} />
                        <FieldControl
                            control="input"
                            type="date"
                            label="Purchase Date"
                            name="purchase_date"
                            onChange={formik.handleChange}
                            errorMessage={formik.errors.purchase_date} />
                        <FieldControl
                            control="input"
                            type="text"
                            label="Current Location"
                            name="location"
                            placeholder="Current Location"
                            onChange={formik.handleChange}
                            errorMessage={formik.errors.location} />
                        <FieldControl
                            control="input"
                            type="number"
                            label="Price"
                            name="price"
                            placeholder="Price"
                            onChange={formik.handleChange}
                            errorMessage={formik.errors.price} />
                        <Form.Group as={Row} controlId="image" className="AssetForm_form-group">
                            <Form.Label column sm={4}>Photo</Form.Label>
                            <Form.File
                                className="col-sm-8 AssetForm_form-file"
                                name="image"
                                // onChange={formik.handleChange}
                                onChange={(event) => {
                                    if (!!event.currentTarget.files[0]) {
                                        formik.setFieldValue('image', event.currentTarget.files[0]);
                                    }
                                }}
                                isInvalid={!!formik.errors.image}
                                accept="image/jpg, image/jpeg, image/png"
                                label={(!!formik.values.image) 
                                        ? formik.values.image.name 
                                        : "Choose a file"}
                                custom
                                 />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {formik.errors.image}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <FieldArray name="fileAttachments" id="fileAttachements">
                            {fieldArrayProps => {
                                const { push, remove, form } = fieldArrayProps;
                                const { values } = form;
                                const { fileAttachments } = values;

                                fileAttachments.filter(function() { return true; })

                                const fieldArray = fileAttachments.map((attachment, index) => (                                   
                                    // <Form.Group as={Row} controlId="fileAttachments" className="AssetForm_form-group">
                                    <Form.Group as={Row} 
                                        controlId={`fileAttachments[${index}]`} 
                                        className="AssetForm_form-group">
                                        <Form.Label
                                            column sm={4}>
                                            {index === 0 && ("File Attachments")} 
                                        </Form.Label>
                                        <div className="col-sm-8 AssetForm_attachments">
                                        <Form.File 
                                            className="AssetForm_form-file"
                                            key={index}
                                            name={`fileAttachments[${index}]`}
                                            // onChange={formik.handleChange}
                                            onChange={(event) => {
                                                if (!!event.currentTarget.files[0]) {
                                                    formik.setFieldValue(
                                                        `fileAttachments[${index}]`, 
                                                        event.currentTarget.files[0]
                                                    );
                                                }
                                            }}
                                            isInvalid={!!formik.errors.fileAttachments}
                                            label={(!!fileAttachments[index]) 
                                                        ? formik.values.fileAttachments[index].name
                                                        : "Choose a file"}
                                            custom
                                        />
                                        {((fileAttachments.length > 1 && index === fileAttachments.length - 1) 
                                            || (fileAttachments.length === 1)) && (
                                            <button
                                                className="btn AssetForm_grey-button"
                                                type="button" 
                                                onClick={() => push(undefined)}>
                                                    {' '}+{' '}
                                            </button>
                                        )}
                                        {(fileAttachments.length > 1) && (
                                            <button
                                                type="button" 
                                                className="btn AssetForm_grey-button"
                                                onClick={() => remove(index)}>
                                                    {' '}-{' '}
                                            </button>
                                        )}
                                        </div>
                                    </Form.Group>                               
                                ));
                                return fieldArray;
                            }}
                        </FieldArray>
                        <FieldControl
                            control="textarea"
                            label="Note"
                            name="note"
                            placeholder="Notes"
                            rows={3}
                            onChange={formik.handleChange}
                            errorMessage={formik.errors.note} />
                        <Form.Group as={Row} className="AssetForm_form-group">
                            <Col sm={12} className="AssetForm_button-row">
                                <Button type="submit" className="AssetForm_submit-button">Add New Asset</Button>
                                <button type="button" className="btn AssetForm_grey-button">Cancel</button>
                            </Col>
                        </Form.Group>
                    </Form>
                )
            }}
        </Formik>
        </div>
        </div>
    )
}

export default AddAssetForm;