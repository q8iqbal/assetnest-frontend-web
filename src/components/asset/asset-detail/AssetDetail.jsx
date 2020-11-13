import React, {useEffect, useState} from 'react';
import './AssetDetail.scss';
import AssetInfo from './asset-info/AssetInfo';
import AssetAttachment from './asset-attachment/AssetAttachment';
import axios from 'axios';
import {BASE_URL, GET_ASSET } from '../../../constants/urls';
import { getCookie } from '../../../utils/auth';
<<<<<<< HEAD
import Image from '../../../assets/icons/image.jpg';
=======
>>>>>>> dev-nawa-2

export default function AssetDetail(props) {
  const id = props.location.state;
  axios.defaults.headers.common['Authorization'] = 'Bearer'+getCookie();
  const [asset, setAsset] = useState({});
  const [attachment, setAttachment] = useState([]);
  const GET_ATTACHMENT = `${GET_ASSET + id}/attachment`
  
  useEffect(() => {
    axios.get(GET_ASSET + id)
    .then((response) => {
      setAsset(response.data.data);
      console.log(response.data.data);

      axios.get(GET_ATTACHMENT)
      .then((response) => {
        console.log(response.data.data);
        setAttachment(response.data.data);
      });
    });

  },[]);

  return (
    <div className="asset-detail row">
        <div className="main col-md-5">
            <h3><span className="text-primary">#</span>{asset.code}</h3>
            <h3>{asset.name}</h3>
<<<<<<< HEAD
            {
              asset.image == null ? (
                <img src={Image} className="rounded mb-3 img-fluid w-100"/>
              ) : (
                <img src={BASE_URL + asset.image} className="rounded mb-3 img-fluid w-100"/>
              )
            }
=======
            <img src={BASE_URL + asset.image} className="rounded mb-3 img-fluid w-100"/>
>>>>>>> dev-nawa-2
            <h4 className="text-primary">Files Attachment</h4>
            {attachment.map(attachment => 
              <AssetAttachment key={attachment.id} attachment={attachment}/>
            )}
        </div>
        <div className="fragment col-md-7 mt-5">
<<<<<<< HEAD
            <h4 className="d-inline-block text-primary px-1 mr-2">Asset Info</h4>
            {/* <h4 className="d-inline-block detail-option disabled">Asset History</h4> */}
=======
            <h4 className="d-inline-block detail-option px-1 mr-2">Asset Info</h4>
            <h4 className="d-inline-block detail-option disabled">Asset History</h4>
>>>>>>> dev-nawa-2
            <AssetInfo asset={asset}/>
        </div>
    </div>
  );
}
