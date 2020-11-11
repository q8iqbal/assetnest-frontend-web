import React, {useEffect, useState} from 'react';
import './AssetDetail.scss';
import AssetInfo from './asset-info/AssetInfo';
import AssetAttachment from './asset-attachment/AssetAttachment';
import axios from 'axios';

export default function AssetDetail() {
  const [asset, setAsset] = useState({});
  const [attachment, setAttachment] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/assets/2', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        // 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODA4MFwvbG9naW4iLCJpYXQiOjE2MDUwOTY5ODcsImV4cCI6MTYwNTEwMDU4OCwibmJmIjoxNjA1MDk2OTg4LCJqdGkiOiJpSUdSbTJNVkM4c3BPUHpHIiwic3ViIjo1LCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.tl4Lk9ZtCOhB7zSuaHwSV93Y7AuDLAPA1eg7TbfLFnQ'
      }
    })
    .then((response) => {
      setAsset(response.data.data);

      axios.get('http://localhost:8080/assets/1/attachment',{
        headers: {
          // 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODA4MFwvbG9naW4iLCJpYXQiOjE2MDUwOTY5ODcsImV4cCI6MTYwNTEwMDU4OCwibmJmIjoxNjA1MDk2OTg4LCJqdGkiOiJpSUdSbTJNVkM4c3BPUHpHIiwic3ViIjo1LCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.tl4Lk9ZtCOhB7zSuaHwSV93Y7AuDLAPA1eg7TbfLFnQ'
        }
      })
      .then((response) => {
        console.log(response.data.data);
        setAttachment(response.data.data);
      });
    });

  },[]);
  
  console.log(attachment);
  return (
    <div className="asset-detail row">
        <div className="main col-md-5">
            <h3><span className="text-primary">#</span>{asset.code}</h3>
            <h3>{asset.name}</h3>
            <img src={"http://localhost:8080" + asset.image} className="rounded mb-3 img-fluid w-100"/>
            <h4 className="text-primary">Files Attachment</h4>
            {attachment.map(attachment => 
              <AssetAttachment key={attachment.id} attachment={attachment}/>
            )}
        </div>
        <div className="fragment col-md-7 mt-5">
            <h4 className="d-inline-block detail-option px-1 mr-2">Asset Info</h4>
            <h4 className="d-inline-block detail-option disabled">Asset History</h4>
            <AssetInfo asset={asset}/>
        </div>
    </div>
  );
}
