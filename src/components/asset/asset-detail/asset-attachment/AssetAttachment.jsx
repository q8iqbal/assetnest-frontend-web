import React from 'react';
import './AssetAttachment.scss';
import {BASE_URL} from '../../../../constants/urls';
import { Link } from 'react-router-dom';

export default function AssetAttachment(props){
    return(
        <div className="d-inline-block text-center mr-3">
            <img src={BASE_URL + props.attachment.path} className="thumbnail rounded mb-1"/>
            {/* <Link to={`` + BASE_URL + props.attachment.path}> */}
                <p>{props.attachment.filename}</p>
            {/* </Link> */}
        </div>
    );
}
