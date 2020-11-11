import React from 'react';
import './AssetAttachment.scss';

export default function AssetAttachment(props){
    // const image = "http://localhost:8000".props.attachment.path;
    // console.log(image);
    return(
        <div className="d-inline-block text-center mr-3">
            <img src={"http://localhost:8080" + props.attachment.path} className="rounded mb-1"/>
            <p>{props.attachment.filename}</p>
        </div>
    );
}
