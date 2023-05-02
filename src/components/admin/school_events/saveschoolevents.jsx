import {Form, Row, Col} from "react-bootstrap"
import { useRef, useState } from "react"
import TeacherNavbar from "../../navbars/teacher_navbar"
import './form.css'
import axios from "axios"

const SaveSchoolEvents = () => {
    const [activeTab, setActiveTab] = useState('save examination data');
    const [eventName, setEventName] = useState('')
    const [eventTerm, setEventTerm] = useState('')
    const [eventClass, setEventClass] = useState('')
    const [eventDate, setEventDate] = useState()

    const [isEventSaveSuccessful, setIsEventSaveSuccessful] = useState(undefined)
    const [saveStatusMsg, setSaveStatusMsg] = useState('')
    const [validationErrorStatus, setValidationErrorStatus] = useState(undefined)

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const eventNameHandler = event => {
        event.preventDefault()
        setEventName(event.target.value)
    }

    const eventTermHandler = event => {
        event.preventDefault()
        setEventTerm(event.target.value)
    }

    const eventClassHandler = event => {
        event.preventDefault()
        setEventClass(event.target.value)
    }

    const eventDateHandler = event => {
        event.preventDefault()
        setEventDate(event.target.value)
    }

    const inputFieldValidator =() => {
        if(eventName.trim().length !== 0 && eventTerm.trim().length !== 0
        && eventClass.trim().length !== 0 && eventDate.trim().length !== 0 ){
            setValidationErrorStatus(false)
        }else{
            setValidationErrorStatus(true)
        }
    }

    const saveSchoolEventHandler = async (event) => {
        event.preventDefault()
        inputFieldValidator()
        if(!validationErrorStatus){
            let res = await axios.post('http://localhost:5000/saveschoolevent',{
                token: localStorage.getItem('token'),
                eventName: eventName,
                eventTerm: eventTerm,
                eventClass: eventClass,
                eventDate: eventDate
            })
            console.log(res.data)
                if(res.data.responseStatus !== 403 || res.data.responseStatus !== 404){
                    setIsEventSaveSuccessful(true)
                    setSaveStatusMsg(res.data.responseMsg)
                }else{
                    setIsEventSaveSuccessful(false)
                    setSaveStatusMsg(res.data.responseMsg)
                }
        }
        
        console.log(res.data)
    }


    return(
        <Row>
            <Row>
                <Col sm='12' md='12' lg='12' xl='12'>
                    {/* <TeacherNavbar activeTab={activeTab} onTabChange={handleTabChange}/> */}
                </Col>
            </Row>
            <div className="col-md-4 offset-md-4">
            <h4 style={{textAlign:'center'}}>Save School Event</h4>
                {<p className={isEventSaveSuccessful === true ? "alert alert-success" : 'none'} style={{textAlign: "center", fontFamily: "akshar", fontStyle: "normal", fontSize: "15px" }}>{saveStatusMsg}</p>}
                {<p className={isEventSaveSuccessful === false ? "alert alert-danger" : 'none'} style={{textAlign: "center", fontFamily: "akshar", fontStyle: "normal", fontSize: "15px" }}>{saveStatusMsg}</p>}
                {validationErrorStatus && <p style={{ color: "red", textAlign: "center", fontFamily: "akshar", fontStyle: "normal", fontSize: "15px" }}>Please fill in all the fields.</p>}
                <Form style={{textAlign:'center'}} encType="multipart/form-data">
                    <input className="form-control" placeholder="Event Name" onChange={eventNameHandler}/>
                    <div className="mb-3" style={{marginTop:'10px'}}>
                        <select className="form-select" aria-label="Default select example" onChange={eventTermHandler}>
                                <option defaultValue>Select School Term</option>
                                <option value="Term 1">Term One</option>
                                <option value="Term 2">Term Two</option>
                                <option value="Term 3">Term Three</option>
                        </select>
                    </div>
                    <div className="mb-3" style={{marginTop:'10px'}}>
                        <select className="form-select" aria-label="Default select example" onChange={eventClassHandler}>
                                <option defaultValue>Select Student Class</option>
                                <option value="S1">Senior One</option>
                                <option value="S2">Senior Two</option>
                                <option value="S3">Senior Three</option>
                                <option value="S4">Senior Four</option>
                                <option value="S5">Senior Five</option>
                                <option value="S6">Senior Six</option>
                        </select>
                    </div>

                    <input className="form-control" type="date" onChange={eventDateHandler}/>
                    <button className="btn btn-primary" style={{width:'100%'}} onClick={saveSchoolEventHandler}>Save</button>
                </Form>
            </div>
        </Row>
    )
}

export default SaveSchoolEvents