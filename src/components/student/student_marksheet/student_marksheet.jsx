import {Row, Col} from "react-bootstrap"
import { useState } from "react";
import StudentNavbar from "../../navbars/student_navbar";

const StudentMarkSheet = () => {
    const [activeTab, setActiveTab] = useState('save examination data');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return(
        <Row>
             <Col sm='12' md='12' lg='12' xl='12'>
                <StudentNavbar activeTab={activeTab} onTabChange={handleTabChange}/>
            </Col>
            <Row>
                <div className="col-md-6 offset-md-3">
                    <input className="form-control" placeholder="First Name" readOnly/>
                    <input className="form-control" placeholder="Last Name" readOnly/>
                    <input className="form-control" placeholder="Class" value={localStorage.getItem('Class') || ''} readOnly/>
                    <input className="form-control" placeholder="Stream" value={localStorage.getItem('Stream') || ''} readOnly/>
                    <button className="btn btn-primary" style={{width:'100%'}}>Get Results</button>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">PHY</th>
                                <th scope="col">BIO</th>
                                <th scope="col">MTC</th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            <tr>
                                <td>78</td>
                                <td>79</td>
                                <td>67</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Row>
        </Row>
    )
}

export default StudentMarkSheet