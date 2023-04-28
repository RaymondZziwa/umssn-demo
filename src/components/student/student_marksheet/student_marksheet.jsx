import {Row, Col} from "react-bootstrap"
import { useState } from "react";
import StudentNavbar from "../../navbars/student_navbar";
import axios from "axios";

const StudentMarkSheet = () => {
    const [activeTab, setActiveTab] = useState('save examination data');
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    let resultsMap;
    const [studentResults, setStudentResults] = useState()
    const [isResultsLoading, setIsResultsLoading] = useState(true)
    const fnameHandler = event => {
        event.preventDefault()
        setFirstName(event.target.value)
    }
    const lnameHandler = (event) => {
        event.preventDefault()
        setLastName(event.target.value)
    }
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const fetchResultsHandler = async (event) => {
        event.preventDefault()
        let res = await axios.post('http://localhost:5000/fetchstudentresults',{
            fname: firstName,
            lname: lastName
        })
        if (typeof res.data === 'string') {
            setIsResultsLoading(true)
            console.log(res.data)
        } else {
            console.log(res.data[0])
            setIsResultsLoading(false)
            setStudentResults(res.data[0])
        }
         resultsMap = new Map(Object.entries(studentResults));
        console.log('logging map', resultsMap)
    }

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
                    <h4 style={{textAlign:'center'}}>View Academic Performance</h4>
                    <input className="form-control" placeholder="First Name" onChange={fnameHandler}/>
                    <input className="form-control" placeholder="Last Name"  onChange={lnameHandler}/>
                    <input className="form-control" placeholder="Class" value={localStorage.getItem('Class') || ''} readOnly/>
                    <input className="form-control" placeholder="Stream" value={localStorage.getItem('Stream') || ''} readOnly/>
                    <button className="btn btn-primary" style={{width:'100%'}} onClick={fetchResultsHandler}>Get Results</button>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Subject</th>
                                <th scope="col">Results</th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">
                        {isResultsLoading ? <tr><td>There is no Data From Database.</td></tr> :
                                Object.keys(studentResults).map(key => (
                                    <tr> 
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