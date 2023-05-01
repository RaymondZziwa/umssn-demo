import {Form, Row, Col} from "react-bootstrap"
import { useRef, useState } from "react"
import TeacherNavbar from "../../navbars/teacher_navbar"
import './form.css'
import axios from "axios"
import formData from "form-data"

const ImportMarkSheetForm = () => {
    const [examSet, setExamSet] = useState()
    const [file, setFile] = useState(null)
    const [studentClass, setClass] = useState('')
    const [studentStream, setStream] = useState('')
    const fileRef = useRef()
    const [activeTab, setActiveTab] = useState('save examination data');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const getExamSet = event => {
        event.preventDefault()
        setExamSet(event.target.value)
    }

    const submitHandler = event => {
        event.preventDefault()
        console.log('file', file)
        let formdata = new formData()
        formdata.append("examsetid", examSet)
        formdata.append("file",file)

        axios.post('http://localhost:5000/savestudentresults', 
        formdata
        ).then((res)=> console.log(res.data))
    }
    return(
       <Row>
             <Row>
            <Col sm='12' md='12' lg='12' xl='12'>
                <TeacherNavbar activeTab={activeTab} onTabChange={handleTabChange}/>
            </Col>
        </Row>
            <div className="col-md-4 offset-md-4">
            <h4 style={{textAlign:'center'}}>Submit Final Examination Marksheet</h4>
            <Form style={{textAlign:'center'}} encType="multipart/form-data">
                <input className="form-control" placeholder="Examination Set Name" onChange={getExamSet}/>
                <input className="form-control" placeholder="Class" value={localStorage.getItem('Class') || ''} readOnly/>
                <input className="form-control" placeholder="Stream" value={localStorage.getItem('Stream') || ''} readOnly/>
                <input className="form-control" type="file" multiple placeholder="submit mark sheet" onChange={(e)=> setFile(e.target.files[0])} ref={fileRef} accept=".xlsx, .xls, .csv"/>
                <button className="btn btn-primary" onClick={submitHandler} style={{width:'100%'}}>Submit</button>
            </Form>
            </div>
       </Row>
    )
}

export default ImportMarkSheetForm