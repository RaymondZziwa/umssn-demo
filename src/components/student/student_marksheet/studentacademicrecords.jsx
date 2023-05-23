import { useState, useEffect, useRef } from "react";
import {Row, Col} from "react-bootstrap"
import StudentNavbar from "../../navbars/student_navbar";
import axios from "axios";

const StudentAcademicRecords = () => {
    const [activeTab, setActiveTab] = useState('student academic records');
    const [examSets, setExamSets] = useState()
    const [isExamSetsListLoading, setIsExamSetsListLoading] = useState(true)
    const [isResultsLoading, setIsResultsLoading] = useState(true)
    const [fetchedResults, setFetchedResults] = useState()

    const selectedExamSetRef = useRef() 

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const fetchAllExamSets = async() => {
        let res = await axios.post('http://82.180.136.230:5000/fetchallexamsets',{
            token: localStorage.getItem('token')
        })

        if(res.data.responseStatus !== 404 || res.data.responseStatus !== 403){
            setIsExamSetsListLoading(false)
            setExamSets(res.data)
        }
    }

    useEffect(() => {
        fetchAllExamSets()
    }, [])
    

    const fetchExamSetResultsHandler = async(event) => {
        event.preventDefault()
        let res = await axios.post('http://82.180.136.230:5000/fetchresults', {
            studentIdNumber : localStorage.getItem('studentIdNumber'),
            selectedExamSetId : selectedExamSetRef.current.value
        })

        if(res.data.responseStatus !== 404 || res.data.responseStatus !== 403){
            setIsResultsLoading(false)
            setFetchedResults(res.data[0])
        }else if(res.data.responseStatus === 404){
            setIsResultsLoading(true)
            setFetchedResults(res.data.responseMsg)
        }

        console.log(res.data)
    }

    function getValueByKey(object, row) {
        return object[row];
    }

    return (
        <Row>
             <Col sm='12' md='12' lg='12' xl='12'>
                <StudentNavbar activeTab={activeTab} onTabChange={handleTabChange}/>
            </Col>
            <Row>
                <div className="col-md-6 offset-md-3">
                    <h4 style={{textAlign:'center'}}>View Past Academic Records</h4>
                    <div className="mb-3">
                        <select className="form-select" aria-label="Default select example" ref={selectedExamSetRef} onChange={fetchExamSetResultsHandler}>
                            <option defaultValue>Select Examination Set</option>
                            {isExamSetsListLoading ? 
                                    <option defaultValue>Select Examination Set</option> : 
                                    examSets.map((set => (
                                        <option key={set.examsetid} value={set.examsetid}>{set.examsetname}</option>
                                    )))
                            }
                        </select>
                    </div>

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Subject</th>
                                <th scope="col">Results</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                        {(isResultsLoading || typeof fetchedResults !== "object") ? <tr><td>Select examination set to see results.</td></tr> :
                                Object.keys(fetchedResults).map(key => (
                                    <tr key={key}> 
                                        <td>{key}</td>
                                        <td>{getValueByKey(fetchedResults, key)}</td>
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

export default StudentAcademicRecords