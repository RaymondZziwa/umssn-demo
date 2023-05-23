import { useState, useEffect, useRef } from "react";
import {Row, Col} from "react-bootstrap"
import StudentNavbar from "../../navbars/student_navbar";
import TeacherNavbar from "../../navbars/teacher_navbar";
import loading from '../../../imgs/Loading.gif'
import axios from "axios";

const ClassEvents = () => {
    const [activeTab, setActiveTab] = useState('school class events');
    const [schoolEvents, setSchoolEvents] = useState()
    const [isEventsLoading, setIsEventsLoading] = useState(true)
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const fetchSchoolEvents = async () => {
        let res = await axios.post('http://82.180.136.230:5000/fetchschoolevents',{
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
                {localStorage.getItem('role') === 'tutor' ? <TeacherNavbar activeTab={activeTab} onTabChange={handleTabChange}/> :
                                    <StudentNavbar activeTab={activeTab} onTabChange={handleTabChange}/>
                }
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
                                    <tr key={event.eventname}>
                                        <td>{event.class}</td>
                                        <td>{event.eventname}</td>
                                        <td>{event.eventdate}</td>
                                        <td>{event.eventterm}</td>
                                    </tr>
                                ))) :
                                <tr>
                                    <p style={{textAlign:'center'}}><img src={loading} alt='loading' style={{height:'80px'}}/><br></br>Loading school events...</p>
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