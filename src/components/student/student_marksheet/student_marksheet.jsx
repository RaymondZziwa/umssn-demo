import {Row, Col} from "react-bootstrap"
import { useEffect, useState } from "react";
import StudentNavbar from "../../navbars/student_navbar";
import axios from "axios";
import loading from "../../../imgs/Loading.gif"

const StudentMarkSheet = () => {
    const [activeTab, setActiveTab] = useState('save examination data');
    let resultsMap;
    const [studentResults, setStudentResults] = useState()
    const [isResultsLoading, setIsResultsLoading] = useState(true)
    const [examSetName, setExamSetName] = useState('')
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const fetchResultsHandler = async () => {
        let res = await axios.post('http://82.180.136.230:5000/fetchstudentresults',{
            token: localStorage.getItem('token'),
            studentIdNumber: localStorage.getItem('studentIdNumber')
        })
        console.log(res.data)
        if (typeof res.data === 'string') {
            setIsResultsLoading(true)
            console.log(res.data)
        } else {
            console.log(res.data)
            setExamSetName(res.data.examSetName)
            setIsResultsLoading(false)
            setStudentResults(res.data.sqlResult[0])
        }
         resultsMap = new Map(Object.entries(studentResults));
         console.log('logging map', resultsMap)
    }

    useEffect(()=>{
        fetchResultsHandler()
    },[])

    function getValueByKey(object, row) {
        return object[row];
    }
    return(
        <Row>
             <Col sm='12' md='12' lg='12' xl='12'>
                <StudentNavbar activeTab={activeTab} onTabChange={handleTabChange}/>
            </Col>
            <Row>
                <div className="col-md-6 offset-md-3">
                    <h4 style={{textAlign:'center'}}>View Most Recent Academic Performance</h4>
                    <p style={{textAlign:'center',fontSize:'20px'}}>Examination Set Name: {examSetName}</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Subject</th>
                                <th scope="col">Results</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                        {(isResultsLoading  && localStorage.getItem('userLoginStatus') !== true) ? <tr><td><p style={{textAlign:'center'}}><img src={loading} alt='loading' style={{height:'80px'}}/><br></br>Loading student most recent performance...</p></td></tr> :
                                Object.keys(studentResults).map(key => (
                                    <tr key={key}> 
                                        <td>{key}</td>
                                        <td>{getValueByKey(studentResults, key)}</td>
                                    </tr>
                                ))                
                        }
                        </tbody>
                    </table>
                </div>
            </Row>
        </Row>
    )
}

export default StudentMarkSheet