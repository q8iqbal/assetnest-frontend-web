import React from 'react'
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Error() {
    return (
        <div className="d-flex align-items-center justify-content-center text-center text-primary" style={{minWidth:"100%", minHeight:"100%"}}>
            <div className="shadow p-5 bg-white rounded" >
                <h1>
                    404
                </h1>
                <h2>
                    Page Not Found? 
                </h2>
                <Button variant="primary mt-3" ><Link className="text-white text-decoration-none" to="/home/">Back to Home</Link></Button>
            </div>
        </div>
    )
}
