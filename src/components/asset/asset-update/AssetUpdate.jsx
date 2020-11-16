import React, { useState } from 'react';
import { Link , useHistory} from 'react-router-dom';
import { Formik, FieldArray } from 'formik';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';
import * as Yup from 'yup';
import './AssetUpdate.scss';
import axios from 'axios';
import { GET_ASSET } from '../../../constants/urls';
import FieldControl from '../asset-form/FieldControl';
import { getCookie } from '../../../utils/auth';
import { useEffect } from 'react';
import Axios from 'axios'

function AddAssetUpdate(props) {
    const history = useHistory()
    const [showFailed, setShowFailed] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [assetId, setAssetId] = useState(props.match.params.id);
    const [loading, setLoading] = useState(true)
    const [initialValues, setInitialValues] = useState('')

    // const initialValues = {
    //     code: '',
    //     name: '',
    //     type: '',
    //     purchase_date: '',
    //     location: '',
    //     price: 0,
    //     image: undefined,
    //     fileAttachments: [undefined],
    //     note: '' 
    // };

    useEffect(() => {
        setLoading(true)
        const config = {
            headers: {
                "Authorization": `Bearer ${getCookie()}`
            }
        };
        Axios.get(GET_ASSET+"/"+assetId,config)
        .then(response => {
            console.log(response.data.data)
            setInitialValues(response.data.data)
        })
        .catch(err => {
            console.log(err)
        })
        .then(()=>{
            if(initialValues.id !== ""){
                setLoading(false)
            }
        })
    }, [])

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
            .test("fileFormat", "Photo should be .jpg, .jpeg, or .png!", (file) => {
                let valid = true;
                if (!!file) {
                    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
                        valid = false;
                    }
                }
                return valid;
            }).nullable().notRequired(),
        fileAttachments: Yup.array()
            .test("is-not-big-file", "File size should be below 8 MB!", (files) => {
                let valid = true;
                if (!!files) {
                    files.map((file) => {
                        if (!!file && file.size > 8388608) {
                            valid = false;
                        }
                    })
                }
                return valid;
            }).
            test("fileFormat", "Photo should be .jpg, .jpeg, or .png!", (file) => {
                let valid = true;
                if (!!file) {
                    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
                        valid = false;
                    }
                }
                return valid;
            })
            .nullable().notRequired(),
        note: Yup.string().nullable().notRequired()
    });

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
                "note": values.note,
                "status": values.status
            }
        };

        let formData = new FormData();

        formData.append("image", values.image);
        axios.post(`${GET_ASSET}/image`, formData, formDataConfig)
            .then(postAssetImage_response => {
                console.log("Post Asset Image Response : ", postAssetImage_response);

                if (!!postAssetImage_response.data.data) {
                    assetData.asset.image = postAssetImage_response.data.data.path;
                }else{
                    assetData.asset.image = initialValues.image;
                }
                console.log(assetData)

                axios.put(GET_ASSET+'/'+assetId, assetData, jsonConfig)
                    .then(postasset_response => {
                        console.log("Post Asset Response : ", postasset_response);
                        setShowSuccess(true);
                        // const POST_ATTACHMENT = `${GET_ASSET}/${assetId}/attachment`;
                        
                        // if (attachmentData.length === 0) {
                        //     setShowSuccess(true);
                        // }

                        // attachmentData.forEach((attachment, index) => {
                        //     let formData = new FormData();

                        //     formData.append("file", attachment);
                        //     axios.post(POST_ATTACHMENT, formData, formDataConfig)
                        //         .then(postattachment_response => {
                        //             console.log(
                        //                 "Post Attachment Response : ", postattachment_response
                        //             );
                        //             if (index === attachmentData.length - 1) {
                        //                 setShowSuccess(true);
                        //             }
                        //         })
                        //         .catch(postattachment_errors => {
                        //             console.log(
                        //                 "Post Attachment Error : ", postattachment_errors
                        //             );
                        //             setShowFailed(true);
                        //         });
                        // });
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
        { value: 'Desktop', key: 'Desktop' },
        { value: 'Vehicle', key: 'Vehicle' },
        { value: 'Machine', key: 'Machine'},
        { value: 'Accessories', key: 'Accessories'},
        { value: 'Document', key: 'Document'},
        { value: 'Etc', key: 'Etc'}
    ];

    const statusOptions = [
        { value: '', key: '- Type -'},
        { value: 'available', key: 'Available' },
        { value: 'dipinjam', key: 'Dipinjam' },
        { value: 'diservis', key: 'Diservis'},
        { value: 'hilang', key: 'Hilang'},
        { value: 'rusak', key: 'Rusak'}
    ];

    return (
    <div className="AssetUpdate mx-3 mx-md-4">

        {
            loading?( 
            <p>Loading....</p> 

            ):(
            <>
            <Alert show={showFailed} variant="danger" 
                    onClose={() => setShowFailed(false)} dismissible>
                <Alert.Heading>Failed to Submit Some Data!</Alert.Heading>
            </Alert>
            
            <Alert show={showSuccess} variant="success" 
                    onClose={() => setShowSuccess(false)} dismissible>
                <Alert.Heading>Data Submitted Successfully!</Alert.Heading>
                <hr/>
                <div className="d-flex justify-content-end">
                    <Button variant="outline-success" onClick={() => history.goBack()}>Go to asset detail</Button>
                </div>
            </Alert>

            <h5 className="d-inline-block font-weight-bold text-primary font-weight-bold">Update Asset</h5>
            <div className="AddAssetUpdate">
            <Formik 
                initialValues={{...initialValues, image:''}}
                validationSchema={validationSchema}
                onSubmit={values => onSubmit(values)}
                validateOnChange={false} 
                >
                {formik => {
                    return (<Form onSubmit={formik.handleSubmit} noValidate 
                                encType="multipart/form-data">
                        <FieldControl
                            control="input"
                            value={formik.values.code}
                            type="text"
                            label="Asset ID"
                            name="code"
                            placeholder="Asset ID"
                            onChange={formik.handleChange}
                            errorMessage={formik.errors.code} />
                        <FieldControl
                            value={formik.values.name}
                            control="input"
                            type="text"
                            label="Asset Name"
                            name="name"
                            placeholder="Asset Name"
                            onChange={formik.handleChange}
                            errorMessage={formik.errors.name} />
                        <FieldControl 
                            value={formik.values.type}
                            control="select"
                            options={typeOptions}
                            label="Type"
                            name="type"
                            onChange={formik.handleChange}
                            errorMessage={formik.errors.type} />
                        <FieldControl 
                            value={formik.values.status}
                            control="select"
                            options={statusOptions}
                            label="Status"
                            name="status"
                            onChange={formik.handleChange}
                            errorMessage={formik.errors.status} />
                        <FieldControl
                            value={formik.values.purchase_date.split(" ")[0]}
                            control="input"
                            type="date"
                            label="Purchase Date"
                            name="purchase_date"
                            onChange={formik.handleChange}
                            errorMessage={formik.errors.purchase_date} />
                        <FieldControl
                            value={formik.values.location}
                            control="input"
                            type="text"
                            label="Location"
                            name="location"
                            placeholder="Current Location"
                            onChange={formik.handleChange}
                            errorMessage={formik.errors.location} />
                        <FieldControl
                            value={formik.values.price}
                            control="input"
                            type="number"
                            label="Price"
                            name="price"
                            placeholder="Price"
                            onChange={formik.handleChange}
                            errorMessage={formik.errors.price} />
                        <Form.Group as={Row} controlId="image" className="AssetUpdate_form-group">
                            <Form.Label column sm={4}>Photo</Form.Label>
                            <Form.File
                                className="col-sm-8 AssetUpdate_form-file"
                                name="image"
                                onChange={(event) => {
                                    if (!!event.currentTarget.files[0]) {
                                        formik.setFieldValue('image', event.currentTarget.files[0]);
                                    }
                                }}
                                isInvalid={!!formik.errors.image}
                                accept="image/jpg, image/jpeg, image/png"
                                label={(!!formik.values.image.name) 
                                        ? formik.values.image.name 
                                        : initialValues.image}
                                custom
                                />
                        </Form.Group>
                        <FieldControl
                            value={formik.values.note}
                            control="textarea"
                            label="Note"
                            name="note"
                            placeholder="Notes"
                            rows={3}
                            onChange={formik.handleChange}
                            errorMessage={formik.errors.note} />
                        <Form.Group as={Row} className="AssetUpdate_form-group">
                            <Col sm={12} className="AssetUpdate_button-row">
                                    <Button type="submit" className="AssetUpdate_submit-button font-weight-bold">
                                        Update
                                    </Button>
                                    <Button type="button" className="btn AssetUpdate_grey-button" onClick={()=>{history.goBack()}}>
                                        Cancel
                                    </Button>
                            </Col>
                        </Form.Group>
                    </Form>)
                }}
            </Formik>
            </div>
            </>
            )
        }

    </div>
    )
}

export default AddAssetUpdate;