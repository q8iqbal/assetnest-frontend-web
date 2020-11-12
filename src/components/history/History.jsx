import React, { useState, useEffect } from 'react'
import { Dropdown, Row , Col , Button, Pagination, Spinner, Alert} from "react-bootstrap"
import DatePicker,{ registerLocale } from  "react-datepicker";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { GET_HISTORY } from '../../constants/urls'
import { getCookie } from '../../utils/auth'
import axios from 'axios'
import id from 'date-fns/locale/es';
import './History.scss'
registerLocale('id', id)

export default function History() {
    axios.defaults.headers.common['Authorization'] = 'Bearer'+getCookie()
    const [loading , setLoading] = useState(true)
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState(new Date())
    const [histories, setHistories] = useState()
    const ExampleCustomInput = ({ value, onClick , placeholder}) => (
        <Button variant="white" className="border" onClick={onClick} >
            {value === "" ? placeholder : value}
        </Button>
    );

    useEffect(()=>{
        axios.get(GET_HISTORY)
        .then(function (response) {
            setHistories(response.data.data.data)
        })
        .catch(function (error) {
            console.log(error);
            setHistories(null)
        })
        .then(()=>{
            setLoading(false)
        })
    },[])

    let active = 2;
    let items = [];
    items.push(
        <Pagination.Item key="before">
                <AiOutlineLeft />
        </Pagination.Item>
    )
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} >
                <span className={number===active? "text-primary" : "text-dark"}>{number}</span>
            </Pagination.Item>,
        );
    }
    items.push(
        <Pagination.Item key="after" >
                <AiOutlineRight />
        </Pagination.Item>
    )


    return (
        <div className="history-page w-100 px-5 py-2 mt-5">
            
            {/* header function */}
            <Row className="head-section"  style={{marginRight:0, marginLeft:0, alignItems:"center"}} xs={1} md={2}>
                <Col className="d-flex align-items-center" >
                    <h2 style={{textDecoration:"underline", textDecorationColor:"#ff7b4b"}}>All Histories</h2>
                    <Dropdown>
                        <Dropdown.Toggle variant="" className="text-muted">Filter By</Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item ></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>

                <Col className="d-flex align-items-center justify-content-end">
                    <DatePicker DatePicker selected={startDate} onChange={date => setStartDate(date)} customInput={<ExampleCustomInput />} dateFormat="d MMMM yyyy" placeholderText="Click to select a date"/>
                    <HiOutlineArrowNarrowRight className="mx-2"/>
                    <DatePicker DatePicker selected={endDate} onChange={date => setEndDate(date)} customInput={<ExampleCustomInput />} dateFormat="d MMMM yyyy" placeholderText="Click to select a date"/>
                </Col>
            </Row>

            {/* header table */}
            <Row className="content-header text-white font-weight-bold rounded mt-2" style={{marginRight:0, marginLeft:0, alignItems:"center", backgroundColor:"grey"}} md={6} xs={3}>
                <Col md={2}>
                    <Dropdown>
                        <Dropdown.Toggle variant="" className="text-white font-weight-bold">Staff</Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item ></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col md={4}>
                    <Dropdown>
                        <Dropdown.Toggle variant="" className="text-white font-weight-bold">Asset Name</Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item ></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col md={2}>
                    <Dropdown>
                        <Dropdown.Toggle variant="" className="text-white font-weight-bold">Asset ID</Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item ></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col md={1}>Status</Col>
                <Col md={2}>
                    <Dropdown>
                        <Dropdown.Toggle variant="" className="text-white font-weight-bold">Date</Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item ></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
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
                    histories===null? (
                        <Row className="content-section bg-white rounded mt-3 shadow"  style={{marginRight:0, marginLeft:0, alignItems:"center",  height:"3rem"}} md={6} xs={3}>
                            Empty
                        </Row>
                    ):(
                        histories.map(value => {
                            return (
                                <Row className="content-section bg-white rounded mt-3 shadow"  style={{marginRight:0, marginLeft:0, alignItems:"center",  height:"3rem"}} md={6} xs={3}>
                                    <Col md={2}>1</Col>
                                    <Col md={4}>2</Col>
                                    <Col md={2}>3</Col>
                                    <Col md={1}>4</Col>
                                    <Col md={2}>5</Col>
                                    <Col md={1} className="d-flex align-items-center justify-content-end">6</Col>
                                </Row>
                            )
                        })
                    )
                )
            }
            <Row className="content-section bg-white rounded mt-3 shadow"  style={{marginRight:0, marginLeft:0, alignItems:"center",  height:"3rem"}} md={6} xs={3}>
                <Col md={2}>1</Col>
                <Col md={4}>2</Col>
                <Col md={2}>3</Col>
                <Col md={1}>4</Col>
                <Col md={2}>5</Col>
                <Col md={1} className="d-flex align-items-center justify-content-end">6</Col>
            </Row>

            {/* footer table */}
            <div className=" footer-section mt-4">
                <p className="float-left">Showing 09-15 of 128 Assets</p>
                <Pagination className="border-none float-right">{items}</Pagination>
            </div>
        </div>
    )
}
