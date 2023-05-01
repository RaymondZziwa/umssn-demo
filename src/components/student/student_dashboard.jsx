import {Row, Col} from "react-bootstrap"
import { useEffect, useState } from "react";
import StudentNavbar from "../navbars/student_navbar";
import './studentdashboard.css'
import maleAvatar from '../../imgs/male-avatar.png'
import femaleAvatar from '../../imgs/female-avatar.png'
import axios from "axios";

const StudentDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const [studentProfile, setStudentProfile] = useState()
    const [isStudentProfileLoading, setIsStudentProfileLoading] = useState(true)

    const [studentAcademicData, setStudentAcademicData] = useState([])
    const [isStudentAcademicDataLoading, setIsStudentAcademicDataLoading] = useState(true)

    const [lineGraphData, setLineGraphData] = useState([])

    const [recentAcademicData, setRecentAcademicData] = useState([])


    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const fetchStudentAcademicData =  async() => {
        let res = await axios.post('http://localhost:5000/fetchstudentacademicdata',{
            token: localStorage.getItem('token'),
            studentIdNumber: localStorage.getItem('studentIdNumber')
        })
        if(res.data.responseStatus !== 403){
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
        
        // for(let i = 0; i < studentAcademicData.length;i++){
        //     setLineGraphData([...lineGraphData,{
        //         examSetId: studentAcademicData[i].examsetid,
        //         studentAverage: studentAcademicData[i].average
        //     }])
        // }
        //console.log(lineGraphData)
        //stopped here trying to push data into an array so that its used for the graph
    }
    useEffect(()=>{
        fetchStudentAcademicData()
    },[])

    const fetchStudentProfileData = async () => {
        let res = await axios.post('http://localhost:5000/fetchstudentprofile',{
            token: localStorage.getItem('token'),
            studentIdNumber: localStorage.getItem('studentIdNumber')
        })

        if(res.data.responseStatus !== 403){
            setIsStudentProfileLoading(false)
            setStudentProfile(res.data)
        }else{
            setIsStudentProfileLoading(true)
        }
    }

    useEffect(()=> {
        fetchStudentProfileData()
    },[])
    return(
        <Row>
            <Col sm='12' md='12' lg='12' xl='12'>
                <StudentNavbar activeTab={activeTab} onTabChange={handleTabChange}/>
            </Col>
            <Row>
                <Col sm='12' md='4' lg='4' xl='4'>
                    <h3>Student Profile</h3>
                    <div style={{display:'grid', placeItems:'center'}}>
                        <img src={maleAvatar} alt="student profile picture" style={{borderRadius:'100%', height:'150px'}}/>
                    </div>
                    {!isStudentProfileLoading ? 
                        studentProfile.map((profile => (
                            <div style={{paddingLeft:'10px'}} key={localStorage.getItem('studentIdNumber')}>
                                Student Names: <span style={{textAlign:'center'}}>{profile.firstname} {profile.middlename} {profile.lastname}</span><br></br>
                                Student Gender: <span style={{textAlign:'center'}}>{profile.gender}</span><br></br>
                                Student Class & Stream: <span style={{textAlign:'center'}}>{profile.studentclass} {profile.studentstream}</span><br></br>
                            </div>
                        ))) : 
                        <p className="alert alert-danger">Your session token is expired. Please log in again.</p>
                    }<br></br>
                </Col>
                <Col sm='12' md='8' lg='8' xl='8' style={{backgroundColor:'yellow'}}>
                    <h3>Student General Academic Overview</h3>
                    -line graph<br></br>
                    {
                                    
                    }
                    
                    -Best performed subject according to last set of exams <br></br>
                    -Worst performed subject according to last set of exams <br></br>
                </Col>
            </Row>
        </Row>
    )
}
export default StudentDashboard