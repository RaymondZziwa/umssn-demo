import { useState, useEffect, useRef } from "react";
import {Row, Col} from "react-bootstrap"
import StudentNavbar from "../../navbars/student_navbar";
import axios from "axios";

const ClassEvents = () => {
    const [activeTab, setActiveTab] = useState('school class events');
    const [schoolEvents, setSchoolEvents] = useState()
    const [isEventsLoading, setIsEventsLoading] = useState(true)
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const fetchSchoolEvents = async () => {
        let res = await axios.post('http://localhost:5000/fetchschoolevents',{
            token: localStorage.getItem('token')
        })

        if(res.data.responseStatus !== 404 || res.data.responseStatus !== 403){
            setIsEventsLoading(false)
            setSchoolEvents(res.data)
        }else if(res.data.responseStatus === 404){
            setIsEventsLoading(true)
        }
        
        console.log(res.data)
    }

    useEffect(() => {
        fetchSchoolEvents()
    }, [])
    return(
        <Row>
             <Col sm='12' md='12' lg='12' xl='12'>
                <StudentNavbar activeTab={activeTab} onTabChange={handleTabChange}/>
            </Col>
            <Row>
                <div className="col-md-6 offset-md-3">
                    <h4 style={{textAlign:'center'}}>Upcoming School Events</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Class</th>
                                <th scope="col">Event Name</th>
                                <th scope="col">Event Date</th>
                                <th scope="col">Event Term</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {(!isEventsLoading || typeof schoolEvents === "object") ?
                                schoolEvents.map((event => (
                                    <tr>
                                        <td>{event.class}</td>
                                        <td>{event.eventname}</td>
                                        <td>{event.eventdate}</td>
                                        <td>{event.eventterm}</td>
                                    </tr>
                                ))) :
                                <tr>
                                    <td>No Data Found.</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </Row>
        </Row>
    )
}

export default ClassEvents