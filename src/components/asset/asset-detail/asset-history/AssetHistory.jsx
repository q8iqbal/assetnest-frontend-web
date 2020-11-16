import React, { useState, useEffect } from 'react'
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from "react-icons/ai";
import {Card, Dropdown, Row , Col, Pagination,Spinner} from 'react-bootstrap'
import { GET_ASSET } from "../../../../constants/urls";
import Axios from 'axios';
import './AssetHistory.scss'

export default function AssetHistory(props) {
    const [sortBy , setSortBy] = useState('name')
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [response, setResponse] = useState()

    useEffect(() => {
        setLoading(true)
        Axios.get(`${GET_ASSET}/${props.id}/history`, {
            params: {
                sort: `${sortBy}`,
                page: page
            }
        })
        .then(function (response) {
            setResponse(response.data.data)
        })
        .catch(function (error) {
            console.log(error);
            setResponse(null)
        })
        .then(()=>{
            setLoading(false)
        })
    }, [sortBy,page])


    // response.data.length === '0'
    const handlePage = number => {
        setPage(number)
    }

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
        <div className="asset-history"  >
            <Card>
                <Card.Body>
                <Row className="content-header text-white font-weight-bold rounded mt-2" style={{marginRight:0, marginLeft:0, alignItems:"center", backgroundColor:"grey"}} md={6} xs={3}>
                    <Col md={4}>
                        <Dropdown >
                            <Dropdown.Toggle variant="" className="text-white font-weight-bold">Staff</Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>{setSortBy('name')}} className={sortBy==='name'?'bg-primary text-white':'bg-white'}>Ascending</Dropdown.Item>
                                <Dropdown.Item onClick={()=>{setSortBy('-name')}} className={sortBy==='-name'?'bg-primary text-white':'bg-white'}>Descending</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col md={4}>
                        <Dropdown>
                            <Dropdown.Toggle variant="" className="text-white font-weight-bold">Date</Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>{setSortBy('date')}} className={sortBy==='date'?'bg-primary text-white':'bg-white'}>Ascending</Dropdown.Item>
                                <Dropdown.Item onClick={()=>{setSortBy('-date')}} className={sortBy==='-date'?'bg-primary text-white':'bg-white'}>Descending</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col md={4}>
                        Status
                    </Col>
                </Row>
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
                        response.data.length === '0' ? (
                            <Row className="content-section bg-white rounded mt-3 shadow"  style={{marginRight:0, marginLeft:0}} md={6} xs={3}>
                                <div className="m-auto text-center">Data Empty</div>
                            </Row>
                        ):(
                            response.data.map(value => {
                                return (
                                    <Row className="content-section bg-white rounded mt-3 shadow"  style={{marginRight:0, marginLeft:0, alignItems:"center", height:"4rem"}} md={6} xs={3}>
                                        <Col md={4}>{value.name}</Col>
                                        <Col md={4}>{value.date}</Col>
                                        <Col md={4}>{value.status}</Col>
                                    </Row>
                                )
                            })
                        )
                    )
                }

                    <div className=" footer-section mt-4">
                        {!loading? ( <p className="float-left">Showing {response.from===null? 0 :response.from+"-"+response.to} of {response.total} History</p> ): ""}
                        <Pagination className="border-none float-right">{items}</Pagination>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}
