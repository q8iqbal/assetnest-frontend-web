import React, {useEffect,useState} from 'react'
import {getCompany} from '../../utils/auth'
import {BASE_URL} from '../../constants/urls'
import { Row, Col, Card, Spinner } from "react-bootstrap"
import { GET_ASSET_COUNT } from '../../constants/urls'
import axios from 'axios'
import './Dashboard.scss'

export default function Dashboard() {
    const type = ['Desktop', 'Vehicle', 'Machine', 'Accessories', 'Document']
    const companyData = getCompany()
    const [assetCount, setAssetCount] = useState(0)
    const [loading, setLoading] = useState(true)
    const lorem = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus excepturi ea dolorem id totam, fugiat ratione, cumque vitae repellat voluptatum ipsam iusto delectus error, voluptates nam illo. Delectus, id dolores?rem'

    let allCount = []
    useEffect(()=> {
        setLoading(true)
        axios.get(GET_ASSET_COUNT)
        .then(response=>{
            console.log(response.data)
            allCount.push(response.data.data)
        })

        type.map((value)=>{
            axios.get(`${GET_ASSET_COUNT}?filter[type]=${value}`)
            .then(response=>{
                console.log(response.data)
                allCount.push(response.data.data)
                if(allCount.length === 6){
                    setAssetCount(allCount)
                    setLoading(false)
                }
            })
        })
    },[])


    return (
        <div className="dashboard-wrapper w-100">
            <Row className="mt-5 bg-white mx-2 rounded" lg={2} xs={1}>
                <Col lg={4}>
                    <img src={`${BASE_URL}${companyData.image}`} alt="logo" width="100%"/>
                </Col>
                <Col lg={8}>
                    <Row className="mt-4">
                        <h1 className="text-secondary font-weight-bold" > { companyData.name} </h1>
                    </Row>
                    <Row className="mt-5"> 
                        <Col xs={7}>
                            <h3>Company Description :</h3>
                            <p>{companyData.description===null? lorem : companyData.description}</p>
                        </Col>
                        <Col xs={5}>
                            <Row>
                                <Col>
                                    <h4>Address : </h4>
                                    <p>{companyData.address}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h4>Phone : </h4>
                                    <p>{companyData.phone}</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>

            {
                loading?(
                    <Col>
                        <Spinner
                        animation="border"
                        variant="primary"
                        className="d-flex justify-content-center ml-auto mr-auto"
                        >
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </Col>
                ):(<>
                {
                    <Row xs={1} md={2} lg={3} className="card-row ">
                        <Col className="bg-white rounded" >
                            <Card style={{height:"10rem"}}>
                                <Card.Body>
                                    <Card.Title>Total Assets</Card.Title>
                                    <Card.Text className="text-primary text-right" style={{fontSize:"4.5rem", fontWeight:600}}>
                                        {assetCount[0]}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    { 
                        type.map((value,idx)=>{
                            console.log(assetCount)
                            return(
                                <Col key={idx} className="bg-white rounded">
                                    <Card style={{height:"10rem"}}>
                                        <Card.Body>
                                            <Card.Title> {value} </Card.Title>
                                            <Card.Text className="text-primary text-right" style={{fontSize:"4.5rem", fontWeight:600}}>
                                                {assetCount[idx+1]}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                    </Row>
                }
                </>)
            }
        </div>
    )
}
