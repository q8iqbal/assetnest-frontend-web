import React, { useState, useEffect } from 'react'
import { Dropdown, Row , Col , Button, Pagination, Spinner, Modal, Form} from "react-bootstrap"
import { IoMdTrash } from "react-icons/io";
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from "react-icons/ai";
import { GET_ASSET, DEL_ASSET } from '../../constants/urls'
import { getCookie } from '../../utils/auth'
import axios from 'axios'
import './Asset.scss'
import { Link, useHistory } from 'react-router-dom';

export default function History() {
    axios.defaults.headers.common['Authorization'] = 'Bearer'+getCookie()
    const [loading , setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [assets, setAssets] = useState()
    const [response, setResponse] = useState()
    const [show, setShow] = useState(false);
    const [sortBy , setSortBy] = useState('name')
    const [id , setId] = useState()
    const [assetName, setAssetName] = useState('')
    const history = useHistory()
    const handleClose = () => setShow(false)
    const handleShow = (id) => {
        setId(id)
        setShow(true)
    }

    const handleDelete = () => {
        axios.delete(`${DEL_ASSET}/${id}`)
        .then(function () {
            setShow(false)
        })
    }

    const handlePage = number => {
        setPage(number)
    }

    useEffect(()=>{
        setLoading(true)
        axios.get(GET_ASSET+`/?filter[name]=${assetName}`, {
            params: {
                sort: `${sortBy}`,
                page: page,
            }
        })
        .then(function (response) {
            setAssets(response.data.data.data)
            setResponse(response.data.data)
        })
        .catch(function (error) {
            console.log(error);
            setAssets(null)
        })
        .then(()=>{
            setLoading(false)
        })
    },[sortBy,show,page,assetName])

    let items = [];
    if(!loading){
        const active = response.current_page
        const pageNeighbour = 2
        const pageTotal = response.last_page
        const leftItem = (active-pageNeighbour) <= 0 ? 1 : (active-pageNeighbour)
        const rightItem = (active+pageNeighbour) > pageTotal ? pageTotal : (active+pageNeighbour)
        items.push(
            <Pagination.Item key="before" onClick={()=>{handlePage(1)}}>
                    <AiOutlineDoubleLeft />
            </Pagination.Item>
        )
        for (let number = leftItem; number <= rightItem; number++) {
            items.push(
                <Pagination.Item key={number} onClick={handlePage.bind(this,number)}>
                    <span className={number===active? "text-primary" : "text-dark"} >{number}</span>
                </Pagination.Item>,
            );
            if(number >= 10)
                break
        }
        items.push(
            <Pagination.Item key="after" onClick={()=> {handlePage(pageTotal)}}>
                    <AiOutlineDoubleRight />
            </Pagination.Item>
        )
    }

    return (
        <div className="asset-page w-100 px-md-5 px-2 py-2 mt-5 overflow-auto">
            
            <Modal show={show} onHide={handleClose}>
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

            {/* header function */}
            <Row className="head-section"  style={{marginRight:0, marginLeft:0, alignItems:"center"}} xs={1} md={2}>
                <Col className="d-flex align-items-center">
                    <h2 className="text-primary font-weight-bold">All Assets</h2>
                </Col>

                <Col className="d-flex align-items-center justify-content-end">
                    <Form.Control placeholder="🔍 Search fixed assets" style={{width:"13rem"}} className="mr-2" value={assetName} onChange={(e)=>{setAssetName(e.target.value)}}/>
                    <Button variant="primary" className="text-nowrap"> <Link to="/home/asset/add/" className="text-decoration-none text-white">Add New Asset</Link> </Button>
                </Col>
            </Row>

            {/* header table */}
            <Row className="content-header text-white font-weight-bold rounded mt-2" style={{marginRight:0, marginLeft:0, alignItems:"center", backgroundColor:"grey"}} md={6} xs={3}>
                <Col md={2}>
                    <Dropdown >
                        <Dropdown.Toggle variant="" className="text-white font-weight-bold">Id</Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={()=>{setSortBy('name')}} className={sortBy==='name'?'bg-primary text-white':'bg-white'}>Ascending</Dropdown.Item>
                            <Dropdown.Item onClick={()=>{setSortBy('-name')}} className={sortBy==='-name'?'bg-primary text-white':'bg-white'}>Descending</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col md={2}>
                    <Dropdown>
                        <Dropdown.Toggle variant="" className="text-white font-weight-bold">Name</Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={()=>{setSortBy('code')}} className={sortBy==='code'?'bg-primary text-white':'bg-white'}>Ascending</Dropdown.Item>
                            <Dropdown.Item onClick={()=>{setSortBy('-code')}} className={sortBy==='-code'?'bg-primary text-white':'bg-white'}>Descending</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col md={2}>Type</Col>
                <Col md={2}>Status</Col>
                <Col md={3}>Location</Col>
                <Col className="d-flex align-items-center justify-content-end" md={1}>Action</Col>
            </Row>
            
            {/* content table */}
            {
                loading? (
                    <Row className="content-section bg-white rounded mt-3 shadow"  style={{marginRight:0, marginLeft:0, alignItems:"center",  height:"3rem"}}>
                            <Spinner
                                animation="border"
                                variant="primary"
                                className="d-flex justify-content-center ml-auto mr-auto"
                            >
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                    </Row>
                ) : (
                    assets.length===0? (
                        <Row className="content-section bg-white rounded mt-3 shadow"  style={{marginRight:0, marginLeft:0}} md={6} xs={3}>
                        <div className="m-auto text-center">Data Empty</div>
                        </Row>
                    ):(
                        assets.map(value => {
                            return (
                                
                                <Row className="content-section bg-white rounded mt-3 shadow "  style={{marginRight:0, marginLeft:0, alignItems:"center"}} md={6} xs={3}>
                                    <Col md={2}> <Link className="text-dark" to={"/home/asset/"+value.id}>{value.code}</Link> </Col>
                                    <Col md={2}> <Link className=" text-dark" to={"/home/asset/"+value.id}>{value.name}</Link></Col>
                                    <Col md={2}>{value.type}</Col>
                                    <Col md={2} className="font-weight-bold">{value.status}</Col>
                                    <Col md={3}>{value.location}</Col>
                                    <Col md={1} className="d-flex align-items-center justify-content-end">
                                        <Button variant="danger" className="px-2" value={value.id} style={{backgroundColor:"#fc646c"}} onClick={handleShow.bind(this,value.id)}>
                                            <IoMdTrash height="10rem"/>
                                        </Button>
                                    </Col>
                                </Row>
                            )
                        })
                    )
                )
            }

            {/* footer table */}
            <div className=" footer-section mt-4">
                {!loading? ( <p className="float-left">Showing {response.from===null? 0 : response.from+"-"+response.to} of {response.total} Assets</p> ): ""}
                <Pagination className="border-none float-right">{items}</Pagination>
            </div>
        </div>
    )
}
