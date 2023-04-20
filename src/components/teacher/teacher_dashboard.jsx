import TeacherNavbar from "../navbars/teacher_navbar"
import { useState } from "react";
import {Row, Col} from "react-bootstrap"
const TeacherDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    return(
        <Row>
            <Col sm='12' md='12' lg='12' xl='12'>
                <TeacherNavbar activeTab={activeTab} onTabChange={handleTabChange}/>
            </Col>
            <Row>
                <p>Teacher Dashboard</p>
            </Row>
        </Row>
    )
}

export default TeacherDashboard