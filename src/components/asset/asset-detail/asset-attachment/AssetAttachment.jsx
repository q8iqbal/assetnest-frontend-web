import React from 'react';
import './AssetAttachment.scss';
import {BASE_URL} from '../../../../constants/urls';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
=======
>>>>>>> dev-nawa-2

export default function AssetAttachment(props){
    return(
        <div className="d-inline-block text-center mr-3">
            <img src={BASE_URL + props.attachment.path} className="thumbnail rounded mb-1"/>
<<<<<<< HEAD
            {/* <Link to={`` + BASE_URL + props.attachment.path}> */}
                <p>{props.attachment.filename}</p>
            {/* </Link> */}
=======
            <p>{props.attachment.filename}</p>
>>>>>>> dev-nawa-2
        </div>
    );
}
