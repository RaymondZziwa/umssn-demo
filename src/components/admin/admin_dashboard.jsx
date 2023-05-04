import { useState } from "react";
import {Row, Col} from "react-bootstrap"
import AdminNavbar from "../navbars/admin_navbar";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    return(
        <Row>
            <Col sm='12' md='12' lg='12' xl='12'>
                <AdminNavbar activeTab={activeTab} onTabChange={handleTabChange}/>
            </Col>
            <Row>
                <p>Admin Dashboard</p>
            </Row>
        </Row>
    )
}

export default AdminDashboard