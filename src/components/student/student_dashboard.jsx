import {Row, Col} from "react-bootstrap"
import { useState } from "react";
import StudentNavbar from "../navbars/student_navbar";

const StudentDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    return(
        <Row>
            <Col sm='12' md='12' lg='12' xl='12'>
                <StudentNavbar activeTab={activeTab} onTabChange={handleTabChange}/>
            </Col>
            <Row>
                <p>Student/Parent Dashboard</p>
            </Row>
        </Row>
    )
}
export default StudentDashboard