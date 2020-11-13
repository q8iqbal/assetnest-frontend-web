import React, {useEffect, useState} from 'react';
import './Asset.scss';
import {Form, Row, Col,Button} from 'react-bootstrap';
import del from '../../assets/icons/delete.svg';
import edit from '../../assets/icons/edit.svg';
import {GET_ASSET} from '../../constants/urls';
import axios from 'axios';
import { getCookie } from '../../utils/auth';
import { Link, useLocation , useHistory} from "react-router-dom"

export default function AssetList(){
    axios.defaults.headers.common['Authorization'] = 'Bearer'+getCookie();
    const [assets, setAssets] = useState([]);
    const history = useHistory();

    useEffect(() => {
        axios.get(GET_ASSET)
        .then((response) => {
            setAssets(response.data.data.data);
        });

    },[]);

    return(
        <div>
            <h4 className="d-inline-block detail-option px-1 mr-2">All Assets</h4>
            <h4 className="d-inline-block detail-option disabled">Filter By</h4>
            <Form className="d-inline-block form-inline float-right">
                <Form.Control
                    className="mr-2"
                    placeholder="Search Asset"
                    />
                <Button type="submit" className="btn-primary">
                    <Link to="/home/asset/add" className="putih">Add New Asset</Link>
                </Button>
            </Form>
            <table className="table table-borderless table-hover">
                <thead className="thead-dark rounded">
                    <tr>
                        <th>Id</th>
                        <th>Asset Name</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Location</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                { assets.map(item => (
                    <tr className="rounded" key={item.id} onClick={() => 
                        history.push({
                            pathname : 'asset/show/'+item.id, 
                            state : item.id
                    })}>
                            <td className="align-middle">{item.code}</td>
                            <td className="align-middle">{item.name}</td>
                            <td className="align-middle">{item.type}</td>
                            <td className="align-middle">{item.status}</td>
                            <td className="align-middle">{item.location}</td>
                            <td className="align-middle">
                                <Button type="submit" className="btn-sm btn-danger mr-1">
                                    <img src={del} alt=""/>
                                </Button>
                                <Button type="submit" className="btn-sm btn-success">
                                    <img src={edit} alt=""/>
                                </Button>
                            </td>
                        </tr>
                ))}
                </tbody>
            </table>
            <div class="container">
                <ul class="pagination justify-content-end">
                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                </ul>
            </div>
        </div>
        
    );
}