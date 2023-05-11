import {Row, Col} from "react-bootstrap"
import { useEffect, useState } from "react";
import TeacherNavbar from "../navbars/teacher_navbar";
import axios from "axios";
import ClassAssesment from "./class_assessment/class_assessment";

const TeacherDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [results, setResults] = useState(undefined)
    const [areResultsLoading, setAreResultsLoading] = useState(true)

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const fetchStudentsResults = async () => {
        let res = await axios.post('http://localhost:5000/fetchallstudentsresults',{
            token: localStorage.getItem('token')
        })

        if(res.data.responseStatus !== 404 || res.data.responseStatus !== 403 ){
            setAreResultsLoading(false)
            setResults(res.data)
        }
    }

    useEffect(() => {
      fetchStudentsResults()
    }, [])
    console.log('results', results)

    return(
        <Row>
        <Col sm='12' md='12' lg='12' xl='12'>
            <TeacherNavbar activeTab={activeTab} onTabChange={handleTabChange}/>
        </Col>
        <Row>
            <Col sm='12' md='4' lg='4' xl='4'>
                <h3>Class Profile</h3>
                <div style={{display:'grid', placeItems:'center'}}>
                    Class :<br></br>
                    Stream:<br></br>
                    Total number of students in stream:<br></br>
                    
                    {/* <ClassAssesment assessmentData={results} /> */}
                </div>

            </Col>
            <Col sm='12' md='8' lg='8' xl='8'>
                <h3>Class General Academic Overview</h3>

            </Col>
        </Row>
    </Row>
    )
}

export default TeacherDashboard