import React, { useState, useEffect } from 'react'
import { Dropdown, Row , Col , Button, Pagination, Spinner, Modal} from "react-bootstrap"
import DatePicker,{ registerLocale } from  "react-datepicker";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { GET_HISTORY, DEL_HISTORY } from '../../constants/urls'
import { getCookie } from '../../utils/auth'
import axios from 'axios'
import id from 'date-fns/locale/es';
import './History.scss'
import { number } from 'yup';
registerLocale('id', id)

export default function History() {
    axios.defaults.headers.common['Authorization'] = 'Bearer'+getCookie()
    const [loading , setLoading] = useState(true)
    const [startDate, setStartDate] = useState(new Date(Date.now() - 1000* 60 * 60 * 24 * 30 * 12))
    const [endDate, setEndDate] = useState(new Date())
    const [page, setPage] = useState(1)
    const [histories, setHistories] = useState()
    const [response, setResponse] = useState()
    const [show, setShow] = useState(false);
    const [sortUser, setSortUser] = useState('')
    const [sortAsset, setSortAsset] = useState('')
    const [sortCode, setSortCode] = useState('')
    const [sortDate, setSortDate] = useState('')
    const [id , setId] = useState()

    const ExampleCustomInput = ({ value, onClick , placeholder}) => (
        <Button variant="white" className="border" onClick={onClick} >
            {value === "" ? placeholder : value}
        </Button>
    );

    const handleClose = () => setShow(false)
    const handleShow = (id) => {
        setId(id)
        setShow(true)
    }

    const handleDelete = () => {
        console.log(id)
        axios.delete(`${DEL_HISTORY}/${id}`)
        .then(function (response) {
            setSortDate(sortDate)
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(()=>{
            setShow(false)
        })
    }

    const handlePage = number => {
        setPage(number)
    }

    const handleNextPage = number => {

    }

    const handlePrevPage = number => {
        
    }

    // console.log(date.toISOString())
    useEffect(()=>{
        setLoading(true)
        axios.get(GET_HISTORY+`?filter[between]=${startDate.toISOString().slice(0, 19).replace('T', ' ')},${endDate.toISOString().slice(0, 19).replace('T', ' ')}`, {
            params: {
                sort: `${sortUser}user,${sortAsset}asset,${sortCode}code,${sortDate}date`,
                page: page
            }
        })
        .then(function (response) {
            console.log(response.data)
            setHistories(response.data.data.data)
            setResponse(response.data.data)
        })
        .catch(function (error) {
            console.log(error);
            setHistories(null)
        })
        .then(()=>{
            setLoading(false)
        })
    },[sortUser,sortAsset,sortCode,sortDate,show,startDate,endDate,page])

    let items = [];
    if(!loading){
        console.log(response)
        const active = response.current_page
        const pageNeighbour = 2
        const pageTotal = response.last_page
        const leftItem = (active-pageNeighbour) <= 0 ? 1 : (active-pageNeighbour)
        const rightItem = (active+pageNeighbour) > pageTotal ? pageTotal : (active+pageNeighbour)
        items.push(
            <Pagination.Item key="before">
                    <AiOutlineLeft />
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
            <Pagination.Item key="after" >
                    <AiOutlineRight />
            </Pagination.Item>
        )
    }

    return (
        <div className="history-page w-100 px-md-5 px-2 py-2 mt-5">
            
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
                <Col className="d-flex align-items-center" >
                    <h2 className="text-primary">All Histories</h2>
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
                    <Dropdown >
                        <Dropdown.Toggle variant="" className="text-white font-weight-bold">Staff</Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={()=>{setSortUser('')}} className={sortUser===''?'bg-primary text-white':'bg-white'}>Ascending</Dropdown.Item>
                            <Dropdown.Item onClick={()=>{setSortUser('-')}} className={sortUser==='-'?'bg-primary text-white':'bg-white'}>Descending</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col md={2}>
                    <Dropdown>
                        <Dropdown.Toggle variant="" className="text-white font-weight-bold">Asset Name</Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={()=>{setSortAsset('')}} className={sortAsset===''?'bg-primary text-white':'bg-white'}>Ascending</Dropdown.Item>
                            <Dropdown.Item onClick={()=>{setSortAsset('-')}} className={sortAsset==='-'?'bg-primary text-white':'bg-white'}>Descending</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col md={2}>
                    <Dropdown>
                        <Dropdown.Toggle variant="" className="text-white font-weight-bold">Asset ID</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={()=>{setSortCode('')}} className={sortCode===''?'bg-primary text-white':'bg-white'}>Ascending</Dropdown.Item>
                            <Dropdown.Item onClick={()=>{setSortCode('-')}} className={sortCode==='-'?'bg-primary text-white':'bg-white'}>Descending</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col md={2}>Status</Col>
                <Col md={3}>
                    <Dropdown>
                        <Dropdown.Toggle variant="" className="text-white font-weight-bold">Date</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={()=>{setSortDate('')}} className={sortDate===''?'bg-primary text-white':'bg-white'}>Ascending</Dropdown.Item>
                            <Dropdown.Item onClick={()=>{setSortDate('-')}} className={sortDate==='-'?'bg-primary text-white':'bg-white'}>Descending</Dropdown.Item>
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
                        <Row className="content-section bg-white rounded mt-3 shadow"  style={{marginRight:0, marginLeft:0, alignItems:"center"}} md={6} xs={3}>
                            Empty
                        </Row>
                    ):(
                        histories.map(value => {
                            return (
                                <Row className="content-section bg-white rounded mt-3 shadow"  style={{marginRight:0, marginLeft:0, alignItems:"center"}} md={6} xs={3}>
                                    <Col md={2}>{value.user}</Col>
                                    <Col md={2}>{value.asset}</Col>
                                    <Col md={2}>{value.code}</Col>
                                    <Col md={2}>{value.status}</Col>
                                    <Col md={3}>{value.date}</Col>
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
                {!loading? ( <p className="float-left">Showing {response.from+"-"+response.to} of {response.total} Assets</p> ): ""}
                <Pagination className="border-none float-right">{items}</Pagination>
            </div>
        </div>
    )
}
