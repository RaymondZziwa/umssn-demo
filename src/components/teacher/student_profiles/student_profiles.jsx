import { useState, useEffect } from "react";
import {Row, Col} from "react-bootstrap"
import TeacherNavbar from "../../navbars/teacher_navbar";
import axios from "axios";

const StudentProfiles = () => {
    const [activeTab, setActiveTab] = useState('student profiles');

    const [areStudentProfilesLoading, setAreStudentProfilesLoading] = useState(true)
    const [studentProfiles, setStudentProfiles] = useState(undefined)

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const fetchStudentProfiles = async() => {
        let res = await axios.post('http://82.180.136.230:5000/fetchstudentprofiles', {
            token: localStorage.getItem('token')
        })

        if(res.data.responseStatus !== 404 || res.data.responseStatus !== 403){
            setAreStudentProfilesLoading(false)
            setStudentProfiles(res.data)
        }else if(res.data.responseStatus === 404){
            setAreStudentProfilesLoading(true)
        }

        console.log(res.data)
    }

    useEffect(() => {
      fetchStudentProfiles()
    }, [])
    

    return(
        <Row>
            <Col sm='12' md='12' lg='12' xl='12'>
                <TeacherNavbar activeTab={activeTab} onTabChange={handleTabChange}/>
            </Col>
            <Row>
            <div className="col-md-6 offset-md-3">
               <h4 style={{textAlign:'center'}}>Student Profiles</h4>
               <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Student Id</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Middle Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Class</th>
                                <th scope="col">Stream</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Parent's Contact 1</th>
                                <th scope="col">Parent's Contact 2</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {(!areStudentProfilesLoading && typeof studentProfiles === "object") ?
                                studentProfiles.map((student => (
                                    <tr key={student.studentid}>
                                        <td>{student.studentid}</td>
                                        <td>{student.firstname}</td>
                                        <td>{student.middlename}</td>
                                        <td>{student.lastname}</td>
                                        <td>{student.studentclass}</td>
                                        <td>{student.studentstream}</td>
                                        <td>{student.gender}</td>
                                        <td>{student.parentcontact1}</td>
                                        <td>{student.parentcontact2}</td>
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

export default StudentProfiles