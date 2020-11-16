import React, {useEffect, useState} from 'react';
import './AssetDetail.scss';
import AssetInfo from './asset-info/AssetInfo';
import AssetHistory from './asset-history/AssetHistory';
import AssetAttachment from './asset-attachment/AssetAttachment';
import axios from 'axios';
import { Modal, Button , Spinner} from "react-bootstrap";
import {BASE_URL, GET_ASSET , DEL_ASSET} from '../../../constants/urls';
import { getCookie } from '../../../utils/auth';
import Image from '../../../assets/icons/image.jpg'; 
import { useHistory } from 'react-router-dom';

export default function AssetDetail(props) {
  const id = props.match.params.id;
  const history = useHistory()
  axios.defaults.headers.common['Authorization'] = 'Bearer'+getCookie();
  const [asset, setAsset] = useState({});
  const [attachment, setAttachment] = useState([]);
  const [showDelete, setShowDelete] = useState(false)
  const [loading , setLoading] = useState(true)
  const [disable, setDisable] = useState(false)
  const GET_ATTACHMENT = `${GET_ASSET+'/'+ id}/attachment`
  
  useEffect(() => {
    setLoading(true)
    axios.get(GET_ASSET+'/'+ id)
    .then((response) => {
      setAsset(response.data.data);
      console.log(response.data.data);

      axios.get(GET_ATTACHMENT)
      .then((response) => {
        console.log(response.data.data);
        setAttachment(response.data.data);
        setLoading(false)
      });
    });

  },[]);

  const handleDelete = ()=>{
    axios.delete(`${DEL_ASSET}/${id}`)
    .then(function () {
        handleClose()
    })
    history.goBack()
  }

  const handleClose = ()=>{
    setShowDelete(false)
  }

  const handleShow = ()=>{
    setShowDelete(true)
  }

  const handleUpdate = ()=>{
    history.push(id+'/update')
  }

  return (
    <div className="asset-detail row mx-2 mx-md-4 mt-5">

    <Modal show={showDelete} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Be Careful</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, Are you sure to delete this thing</Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Nope
        </Button>
        <Button variant="primary" onClick={handleDelete}>
            Yes
        </Button>
        </Modal.Footer>
    </Modal>

        <div className="main col-md-5">
            <h3><span className="text-primary">#</span>{asset.code}</h3>
            <h1 className="font-weight-bold">{asset.name}</h1>
            { 
              asset.image == null ?
              ( <img src={Image} className="rounded mb-3 img-fluid" style={{width:"50rem"}}/> ) 
              : 
              ( <img src={BASE_URL + asset.image} className="rounded mb-3 img-fluid " style={{width:"50rem"}}/>) 
            }
            <h4 className="text-primary font-weight-bold">Files Attachment</h4>
            {attachment.map(attachment => 
              <AssetAttachment key={attachment.id} attachment={attachment}/>
            )}
        </div>
        <div className="fragment col-md-7 mt-5">
            <h4 className={"d-inline-block font-weight-bold text-primary px-1 mr-2 "+(disable? "disabled": "")} onClick={()=>{ if(disable) setDisable(!disable)} } onMouseOver={(e)=>{e.target.style.cursor = "pointer"}}> Asset Info </h4>
            <h4 className={"d-inline-block font-weight-bold text-primary "+(!disable? "disabled": "")} onClick={()=>{ if(!disable) setDisable(!disable)}} onMouseOver={(e)=>{e.target.style.cursor = "pointer"}}> Asset History </h4>
            {
              loading? (
                <div className="row content-section bg-white rounded mt-3 shadow"  style={{marginRight:0, marginLeft:0, alignItems:"center",  height:"3rem"}}>
                  <Spinner
                      animation="border"
                      variant="primary"
                      className="d-flex justify-content-center ml-auto mr-auto"
                  />
                </div>
              ) : (
                disable? (
                  <AssetHistory id={id}/>
                ):(
                  <AssetInfo asset={asset} handleDelete={handleShow} handleUpdate={handleUpdate}/>
                )
              )
            }
        </div>
    </div>
  );
}
