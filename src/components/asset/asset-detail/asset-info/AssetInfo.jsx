import React from 'react';
import './AssetInfo.scss';
import {Card, Button} from 'react-bootstrap';

export default function AssetInfo(props){
    return(
        <div className="asset-info">
            <Card>
                <Card.Body>
                    <div className="row mb-3 no-gutters">
                        <p className="col-md-4 label">Asset Id</p>
                        <p className="col-md-8">{props.asset.code}</p>
                    </div>
                    <div className="row mb-3 no-gutters">
                        <p className="col-md-4 label">Type</p>
                        <p className="col-md-8">{props.asset.type}</p>
                    </div>
                    <div className="row mb-3 no-gutters">
                        <p className="col-md-4 label">Price</p>
                        <p className="col-md-8">{"Rp."+props.asset.price}</p>
                    </div>
                    <div className="row mb-3 no-gutters">
                        <p className="col-md-4 label">Purchase Date</p>
                        <p className="col-md-8">{props.asset.purchase_date}</p>
                    </div>
                    <div className="row mb-3 no-gutters">
                        <p className="col-md-4 label">Status</p>
                        <p className="col-md-8">{props.asset.status}</p>
                    </div>
                    <div className="row mb-3 no-gutters">
                        <p className="col-md-4 label">Location</p>
                        <p className="col-md-8">{props.asset.location}</p>
                    </div>
                    <div className="row mb-3 no-gutters">
                        <p className="col-md-4 label">Note</p>
                        <p className="col-md-8">{props.asset.note}</p>
                    </div>
                    <div className="float-right">
                        <Button variant="danger" className="mr-2 font-weight-bold" onClick={props.handleDelete}>Delete</Button>
                        <Button variant="success" className=" font-weight-bold" onClick={props.handleUpdate}>Edit</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}