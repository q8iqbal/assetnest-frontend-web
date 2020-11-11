import React from 'react';
import './AssetList.scss';
import {Form, Row, Col,Button} from 'react-bootstrap';
import del from '../../../../assets/icons/delete.svg';
import edit from '../../../../assets/icons/edit.svg';

export default function AssetList(){
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
                    Add new Asset
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
                    <tr className="rounded">
                        <td className="align-middle">EYOWDJW</td>
                        <td className="align-middle">Laptop Asusu A422XZ</td>
                        <td className="align-middle">Desktop</td>
                        <td className="align-middle">Used</td>
                        <td className="align-middle">Kantor Admin Bag 2</td>
                        <td className="align-middle">
                            <Button type="submit" className="btn-sm btn-danger mr-1">
                                <img src={del} alt=""/>
                            </Button>
                            <Button type="submit" className="btn-sm btn-success">
                                <img src={edit} alt=""/>
                            </Button>
                        </td>
                    </tr>
                    <tr className="rounded">
                        <td className="align-middle">EYOWDJW</td>
                        <td className="align-middle">Laptop Asusu A422XZ</td>
                        <td className="align-middle">Desktop</td>
                        <td className="align-middle">Used</td>
                        <td className="align-middle">Kantor Admin Bag 2</td>
                        <td className="align-middle">
                            <Button type="submit" className="btn-sm btn-danger mr-1">
                                <img src={del} alt=""/>
                            </Button>
                            <Button type="submit" className="btn-sm btn-success">
                                <img src={edit} alt=""/>
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}