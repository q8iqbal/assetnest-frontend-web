import React, { useState } from 'react';
import { Formik, Field, ErrorMessage, FieldArray } from 'formik';
import { Form, Row, Col, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import './AssetForm.css';
import axios from 'axios';
import { POST_ASSET } from '../constants/urls';
import FieldControl from './asset-form/FieldControl';

const getCurrentDateString = () => {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let currentDateString = [
        year.toString(),
        ((month < 10) ? ("0" + month.toString()) : month.toString()),
        ((day < 10) ? "0" + day.toString() : day.toString()),
    ].join("-");

    return currentDateString;
};

var currentDate = getCurrentDateString();

const initialValues = {
    code: 'PFEHIKJF',
    name: 'Laptop Asusu Gugugu',
    type: 'elektronik',
    status: 'Idle',
    purchase_date: '2012-12-12',
    location: 'Kantor Gudang Barat Laut',
    price: 12500000,
    image: null,
    fileAttachments: [''],
    note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dapibus ex elit, a semper nisi aliquam lacinia. Cras at massa a' 
};

const onSubmit = values => {
    let config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
        
    let assetData = {
        "asset": {
            "code": values.code,
            "name": values.name,
            "type": values.type,
            "status": values.status,
            "purchase_date": values.purchase_date,
            "location": values.location,
            "price": values.price,
            "image": values.image,
            "note": values.note
        }
    };
    let attachmentData = {
        "attachment": values.fileAttachments
    };

    console.log(assetData, attachmentData);
};

const validationSchema = Yup.object({
    code: Yup.string().required("Required!"),
    name: Yup.string().required("Required!"),
    type: Yup.string().required("Required!"),
    purchase_date: Yup
        .date()
        .max(
            new Date(currentDate), 
            `Purchase date should be equal or earlier than ${currentDate}!`
        )
        .required('Required!'),
    location: Yup.string().required("Required!"),
    price: Yup
        .number()
        .positive("Price should be positive values!")
        .required("Required!"),
    image: Yup.mixed().nullable().notRequired(),
    fileAttachments: Yup.mixed().nullable().notRequired(),
    note: Yup.string().nullable().notRequired()
});

function EditAssetForm() {
    const typeOptions = [
        { value: 'elektronik', key: 'Eletronics' },
        { value: 'kendaraan', key: 'Vehicles' },
        { value: 'dokumen', key: 'Documents'},
        { value: 'lain-lain', key: 'Others'}
    ];
    const statusOptions = [
        { value: 'available', key: 'Idle' },
        { value: 'dipinjam', key: 'Used' },
        { value: 'diservis', key: 'Maintenance'},
        { value: 'hilang', key: 'Lost'},
        { value: 'rusak', key: 'Broken'}
    ]

    return (
        <Formik 
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values => onSubmit(values)}
            validateOnChange={false} 
            >
            {formik => {
                console.log(formik);

                return (
                    <Form onSubmit={formik.handleSubmit} noValidate>
                        <FieldControl
                            control="input"
                            type="text"
                            label="Asset ID"
                            name="code"
                            value={ formik.values.code }
                            placeholder="Asset ID"
                            onChange={formik.handleChange}
                            errorMessage={formik.errors.code} />
                        <FieldControl
                            control="input"
                            type="text"
                            label="Asset Name"
                            name="name"
                            placeholder="Asset Name"
                            value={ formik.values.name }
                            onChange={formik.handleChange}
                            errorMessage={formik.errors.name} />
                        <FieldControl 
                            control="select"
                            options={typeOptions}
                            label="Type"
                            name="type"
                            value={ formik.values.type }
                            onChange={formik.handleChange}
                            errorMessage={formik.errors.type} />
                        <FieldControl 
                            control="select"
                            options={statusOptions}
                            label="Status"
                            name="status"
                            value={ formik.values.status }
                            onChange={formik.handleChange}
                            errorMessage={formik.errors.status} />
                        <FieldControl
                            control="input"
                            type="date"
                            label="Purchase Date"
                            name="purchase_date"
                            value={formik.values.purchase_date}
                            onChange={formik.handleChange}
                            errorMessage={formik.errors.purchase_date} />
                        <FieldControl
                            control="input"
                            type="text"
                            label="Current Location"
                            name="location"
                            placeholder="Current Location"
                            value={ formik.values.location }
                            onChange={formik.handleChange}
                            errorMessage={formik.errors.location} />
                        <FieldControl
                            control="input"
                            type="number"
                            label="Price"
                            name="price"
                            placeholder="Price"
                            value={ formik.values.price }
                            onChange={formik.handleChange}
                            errorMessage={formik.errors.price} />
                            
                        <FieldControl
                            control="textarea"
                            label="Note"
                            name="note"
                            placeholder="Notes"
                            rows={3}
                            value={ formik.values.notes }
                            onChange={formik.handleChange}
                            errorMessage={formik.errors.note} />
                        <Form.Group as={Row} className="AssetForm_form-group">
                            <Col sm={12} className="AssetForm_button-row">
                                <Button type="submit" className="AssetForm_submit-button">Save Edit</Button>
                                <button type="button" className="btn AssetForm_grey-button">Delete</button>
                            </Col>
                        </Form.Group>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default EditAssetForm;