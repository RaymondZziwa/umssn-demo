import {Row, Col} from "react-bootstrap"
import { useEffect, useState, useRef } from "react";
import TeacherNavbar from "../../navbars/teacher_navbar";
import '../../student/studentdashboard.css'
import maleAvatar from '../../../imgs/male-avatar.png'
import axios from "axios";
import AverageLineGraph from "../../student/academic_graphs/averagelinegraph";
import SubjectAssesment from "../../student/subject_assesment/subject_assesment";
import SubjectGraph from "../../student/academic_graphs/subjectperformanceanalyzergraph";

const StudentAcademicAnalysis = () => {
    const [activeTab, setActiveTab] = useState('student academic analysis');

    const [studentList, setStudentList] = useState()
    const [isStudentListLoading, setIsStudentListLoading] = useState(true)

    const [studentAcademicData, setStudentAcademicData] = useState([])
    const [isStudentAcademicDataLoading, setIsStudentAcademicDataLoading] = useState(true)

    const [lineGraphData, setLineGraphData] = useState([])

    const [recentAcademicData, setRecentAcademicData] = useState([])

    const [selectedStudent, setSelectedStudent] = useState('')

    const [studentProfile, setStudentProfile] = useState(undefined)
    const [isStudentProfileLoading, setIsStudentProfileLoading] = useState(true)

    const studentIdNumberRef = useRef()

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const fetchStudentAcademicData =  async(studentIdNumber) => {
        let res = await axios.post('http://localhost:5000/fetchstudentacademicdata',{
            token: localStorage.getItem('token'),
            studentIdNumber: studentIdNumber
        })
        if(res.data.responseStatus !== 403 || res.data.responseStatus !== 404){
            setStudentAcademicData(res.data)
            console.log('res', res.data)
            setIsStudentAcademicDataLoading(false)
            setRecentAcademicData(res.data[res.data.length-1])
            console.log('Testing data',studentAcademicData)
            console.log('recent academic data', recentAcademicData)
            console.log('student academic data variable', studentAcademicData)
        }else{
            setIsStudentAcademicDataLoading(true)
        }
    }
    const fetchStudentProfileData = async (studentIdNumber) => {
        let res = await axios.post('http://localhost:5000/fetchstudentprofile',{
            token: localStorage.getItem('token'),
            studentIdNumber: studentIdNumber
        })

        if(res.data.responseStatus !== 403){
            setIsStudentProfileLoading(false)
            setStudentProfile(res.data)
        }else{
            setIsStudentProfileLoading(true)
        }
    }

    const selectedStudentHandler = event => {
        event.preventDefault()
        setSelectedStudent(event.target.value)
        fetchStudentAcademicData(studentIdNumberRef.current.value)
        fetchStudentProfileData(studentIdNumberRef.current.value)
    }


    const fetchAllStudents = async () => {
        let res = await axios.post('http://localhost:5000/fetchstudentprofiles', {
            token: localStorage.getItem('token')
        })

        if(res.data.responseStatus !== 404 || res.data.responseStatus !== 403){
            setIsStudentListLoading(false)
            setStudentList(res.data)
        }else if(res.data.responseStatus === 404){
            setIsStudentListLoading(true)
        }
        console.log('stdtlst', studentList)
    }
    useEffect(() => {
      fetchAllStudents()
    }, [])

    return(
        <Row>
            <Col sm='12' md='12' lg='12' xl='12'>
                <TeacherNavbar activeTab={activeTab} onTabChange={handleTabChange}/>
            </Col>
            <Row>
                <Col sm='12' md='4' lg='4' xl='4'>

                    <h3>Student Profile</h3>
                    <div style={{display:'grid', placeItems:'center'}}>
                    <div className="mb-3">
                        <select className="form-select" aria-label="Default select example" ref={studentIdNumberRef} onChange={selectedStudentHandler} required>
                                <option defaultValue>Select Student To Analyze</option>
                                {!isStudentListLoading ?
                                    studentList.map((student => (
                                        <option key={student.studentid} value={student.studentid}>{student.firstname} {student.middlename} {student.lastname} - {student.studentclass} - {student.studentstream}</option>
                                    ))): 
                                    <p className="alert alert-danger" style={{textAlign:'center',marginTop:'5px'}}>No student has been chosen.</p>            
                                }
                        </select>
                    </div>
                        <img src={maleAvatar} alt="student profile picture" style={{borderRadius:'100%', height:'150px'}}/>
                    </div>
                    {!isStudentProfileLoading ? 
                        studentProfile.map((profile => (
                            <div style={{paddingLeft:'10px',textAlign:'center'}} key={localStorage.getItem('studentIdNumber')}>
                                Student Names: <span style={{textAlign:'center'}}>{profile.firstname} {profile.middlename} {profile.lastname}</span><br></br>
                                Student Gender: <span style={{textAlign:'center'}}>{profile.gender}</span><br></br>
                                Student Class & Stream: <span style={{textAlign:'center'}}>{profile.studentclass} {profile.studentstream}</span><br></br>
                            </div>
                        ))) : 
                        <p className="alert alert-danger" style={{textAlign:'center',marginTop:'5px'}}>No student has been chosen.</p>
                    }<br></br>

                    <SubjectAssesment assessmentData={recentAcademicData}/>
                </Col>
                <Col sm='12' md='8' lg='8' xl='8'>
                    <h3>Student General Academic Overview</h3>
                    <AverageLineGraph academicData={studentAcademicData}/>
                    {(localStorage.getItem('userLoginStatus') && typeof recentAcademicData === 'object') &&
                        <div style={{paddingLeft:'10px'}}>
                          Current Total : <span style={{textAlign:'center'}}>{recentAcademicData.total}</span><br></br>
                          Current Average : <span style={{textAlign:'center'}}>{recentAcademicData.average}</span><br></br>
                          Current Position In Class : <span style={{textAlign:'center'}}>{recentAcademicData.pos_c}</span><br></br>
                          Current Position In Stream : <span style={{textAlign:'center'}}>{recentAcademicData.pos_s}</span>
                        </div>      
                    } 
                    <SubjectGraph assessmentData={studentAcademicData}/>
                </Col>
            </Row>
        </Row>
    )
}
export default StudentAcademicAnalysis