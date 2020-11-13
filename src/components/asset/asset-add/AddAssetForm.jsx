import React, { useState } from 'react';
<<<<<<< HEAD
import { Link, useHistory } from 'react-router-dom';
=======
import { Link } from 'react-router-dom';
>>>>>>> dev-nawa-2
import { Formik, FieldArray } from 'formik';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';
import * as Yup from 'yup';
import './AssetForm.css';
import axios from 'axios';
import { GET_ASSET } from '../../../constants/urls';
import FieldControl from '../asset-form/FieldControl';
import { getCookie } from '../../../utils/auth';

function AddAssetForm() {
    const [showFailed, setShowFailed] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [assetId, setAssetId] = useState(undefined);
<<<<<<< HEAD
    const history = useHistory();
=======
>>>>>>> dev-nawa-2

    const getCurrentDateString = () => {
        let currentDate = new Date();
        let month = currentDate.toLocaleString('en-us', { month: 'long'});
        let day = currentDate.getDate();
        let year = currentDate.getFullYear();
        let currentDateString = [month, `${day}, `, year].join(" ");

        return currentDateString;
    };

    const validationSchema = Yup.object({
        code: Yup.string().required("Asset ID Required!"),
        name: Yup.string().required("Asset Name Required!"),
        type: Yup.string().required("Type Required!"),
        purchase_date: Yup.date()
            .max(
                new Date(), 
                `Purchase date should be equal or earlier than today (${getCurrentDateString()})!`
            ).required('Purchase Date Required!'),
        location: Yup.string().required("Current Location Required!"),
        price: Yup.number().required("Price Required!")
            .positive("Price should be positive values!"),
        image: Yup.mixed()
            .test("is-correct-file", "Photo should be .jpg, .jpeg, or .png!", (file?: File) => {
                let valid = true;
                if (!!file) {
                    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
                        valid = false;
                    }
                }
                return valid;
            }).nullable().notRequired(),
        fileAttachments: Yup.array()
            .test("is-not-big-file", "File size should be below 8 MB!", (files?: [File]) => {
                let valid = true;
                if (!!files) {
                    files.map((file) => {
                        if (!!file && file.size > 8388608) {
                            valid = false;
                        }
                    })
                }
                return valid;
            }).nullable().notRequired(),
        note: Yup.string().nullable().notRequired()
    });

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

    const jsonConfig = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getCookie()}`
        }
    };

    const formDataConfig = {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${getCookie()}`
        }
    }

    const onSubmit = values => {
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
        let attachmentData = values.fileAttachments.filter(attachment => attachment);
        let formData = new FormData();

        formData.append("image", values.image);
        axios.post(`${GET_ASSET}image`, formData, formDataConfig)
            .then(postAssetImage_response => {
                console.log("Post Asset Image Response : ", postAssetImage_response);

                if (!!postAssetImage_response.data.data) {
                    assetData.asset.image = postAssetImage_response.data.data.path;
                }

                axios.post(GET_ASSET, assetData, jsonConfig)
                    .then(postasset_response => {
                        console.log("Post Asset Response : ", postasset_response);
                
                        const id = postasset_response.data.data.id;
                        setAssetId(id);
                        const POST_ATTACHMENT = `${GET_ASSET}${id}/attachment`;
                        
                        if (attachmentData.length === 0) {
                            setShowSuccess(true);
                        }

                        attachmentData.forEach((attachment, index) => {
                            let formData = new FormData();

                            formData.append("file", attachment);
                            axios.post(POST_ATTACHMENT, formData, formDataConfig)
                                .then(postattachment_response => {
                                    console.log(
                                        "Post Attachment Response : ", postattachment_response
                                    );
                                    if (index === attachmentData.length - 1) {
                                        setShowSuccess(true);
                                    }
                                })
                                .catch(postattachment_errors => {
                                    console.log(
                                        "Post Attachment Error : ", postattachment_errors
                                    );
                                    setShowFailed(true);
                                });
                        });
                    })
                    .catch(postasset_errors => {
                        console.log("Post Asset Error : ", postasset_errors);
                        setShowFailed(true);
                    });
            })
            .catch(postAssetImage_errors => {
                console.log("Post Asset Image Error : ", postAssetImage_errors);
                setShowFailed(true);
            })
    };

    const typeOptions = [
        { value: '', key: '- Type -'},
        { value: 'elektronik', key: 'Electronics' },
        { value: 'kendaraan', key: 'Vehicles' },
        { value: 'dokumen', key: 'Documents'},
        { value: 'lain-lain', key: 'Others'}
    ];

    return (<div className="AssetForm">
        <Alert show={showFailed} variant="danger" 
                onClose={() => setShowFailed(false)} dismissible>
            <Alert.Heading>Failed to Submit Some Data!</Alert.Heading>
        </Alert>
        <Alert show={showFailed ? false : showSuccess} variant="success" 
                onClose={() => setShowSuccess(false)} dismissible>
            <Alert.Heading>Data Submitted Successfully!</Alert.Heading>
            <hr/>
            <div className="d-flex justify-content-end">
<<<<<<< HEAD
                <Link to={() => 
                        history.push({
                            pathname : 'show/'+assetId, 
                            state : assetId
                    })}>
=======
                <Link to={`/home/asset/${assetId}`}>
>>>>>>> dev-nawa-2
                    <Button variant="outline-success">Go to asset detail</Button>
                </Link>
            </div>
        </Alert>
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

                return (<Form onSubmit={formik.handleSubmit} noValidate 
                            encType="multipart/form-data">
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
                            feedback={formik.errors.image}
                            custom
                            feedbackTooltip
                             />
                    </Form.Group>
                    <FieldArray name="fileAttachments" id="fileAttachements">
                        {fieldArrayProps => {
                            const { push, remove, form } = fieldArrayProps;
                            const { values } = form;
                            const { fileAttachments } = values;

                            const fieldArray = fileAttachments.map((attachment, index) => (                                   
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
                                        feedback={formik.errors.fileAttachments}
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
                                <Button type="submit" className="AssetForm_submit-button">
                                    Add New Asset
                                </Button>
                            <Link to="/home/asset/list">
                                <button type="button" className="btn AssetForm_grey-button">
                                    Cancel
                                </button>
                            </Link>
                        </Col>
                    </Form.Group>
                </Form>)
            }}
        </Formik>
        </div>
    </div>)
}

export default AddAssetForm;