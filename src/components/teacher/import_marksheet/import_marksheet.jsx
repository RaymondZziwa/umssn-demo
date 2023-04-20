import {Form, Row, Col} from "react-bootstrap"
import { useState } from "react"
import TeacherNavbar from "../../navbars/teacher_navbar"
import './form.css'
const ImportMarkSheetForm = () => {
    const [examSet, setExamSet] = useState()
    const [file, setFile] = useState()

    const [activeTab, setActiveTab] = useState('save examination data');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const getExamSet = event => {
        event.preventDefault()
        setExamSet(event.target.value)
    }
    const getFile = event => {
        event.preventDefault()
        setFile(event.target.value)
    }

    const submitHandler = event => {
        event.preventDefault()
        axios.post(),{
            examinationSetName: examSet,
            class: localStorage.getItem('Class'),
            stream: localStorage.getItem('Stream'),
            dataFile: file
        }
    }
    return(
       <Row>
             <Row>
            <Col sm='12' md='12' lg='12' xl='12'>
                <TeacherNavbar activeTab={activeTab} onTabChange={handleTabChange}/>
            </Col>
        </Row>
            <div className="col-md-4 offset-md-4">
            <h4 style={{textAlign:'center'}}>View Academic Performance</h4>
            <Form style={{textAlign:'center'}}>
                <input className="form-control" placeholder="Examination Set Name" onChange={getExamSet}/>
                <input className="form-control" placeholder="Class" value={localStorage.getItem('Class') || ''} readOnly/>
                <input className="form-control" placeholder="Stream" value={localStorage.getItem('Stream') || ''} readOnly/>
                <input className="form-control" type="file" placeholder="submit mark sheet" onChange={getFile} accept=".xlsx, .xls, .csv"/>
                <button className="btn btn-primary" onClick={submitHandler}>Submit</button>
            </Form>
            </div>
       </Row>
    )
}

export default ImportMarkSheetForm