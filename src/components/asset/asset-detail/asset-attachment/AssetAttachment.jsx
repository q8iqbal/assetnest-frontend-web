import React from 'react';
import './AssetAttachment.scss';
import {BASE_URL} from '../../../../constants/urls';

export default function AssetAttachment(props){
    return(
        <div className="d-inline-block text-center mr-3">
            <img src={BASE_URL + props.attachment.path} className="rounded mb-1"/>
            <p>{props.attachment.filename}</p>
        </div>
    );
}
