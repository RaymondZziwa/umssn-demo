import { Form, useAccordionButton } from "react-bootstrap"
import { useState, useEffect } from "react"
import axios from "axios"

const TeacherRegistration = () => {
    const [studentClass, setStudentClass] = useState('')
    const [isClassStreamsLoading, setIsClassStreamsLoading] = useState(true)
    const [classStreams, setClassStreams] = useState(undefined)

    const [isSubjectListLoading, setIsSubjectListLoading] = useState(true)
    const [subjectList, setSubjectList] = useState(undefined)


    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [stream, setStream] = useState('')
    const [subject, setSubject] = useState('')
    const [contact1, setContact1] = useState()
    const [contact2, setContact2] = useState()
    const [email, setEmail] = useState('')
    const [defaultPassword, setDefaultPassword] = useState('')

    const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(undefined)
    const [registrationStatusMsg, setRegistrationStatusMsg] = useState('')
    const [validationErrorStatus, setValidationErrorStatus] = useState(undefined)

    const firstNameHandler = event => {
        event.preventDefault()
        setFirstName(event.target.value)
    }

    const middleNameHandler = event => {
        event.preventDefault()
        setMiddleName(event.target.value)
    }

    const lastNameHandler = event => {
        event.preventDefault()
        setLastName(event.target.value)
    }

    const streamHandler = event => {
        event.preventDefault()
        setStream(event.target.value)
    }

    const subjectHandler = event => {
        event.preventDefault()
        setSubject(event.target.value)
    }

    const contact1Handler = event => {
        event.preventDefault()
        setContact1(event.target.value)
    }
    const contact2Handler = event => {
        event.preventDefault()
        setContact2(event.target.value)
    }
    const emailHandler = event => {
        event.preventDefault()
        setEmail(event.target.value)
    }
    const defaultPasswordHandler = event => {
        event.preventDefault()
        setDefaultPassword(event.target.value)
    }

    const studentClassHandler = event => {
        event.preventDefault()
        setStudentClass(event.target.value)
    }

    const fetchSubjects = async() => {
        let res = await axios.post('http://82.180.136.230:5000/fetchsubjects', {
            token: localStorage.getItem('token')
        })
         if(res.data.responseStatus !== 404 || res.data.responseStatus !== 403 ){
            setIsSubjectListLoading(false)
            setSubjectList(res.data)
        }
    }

    const fetchStudentClassStreams = async () => {
        let res = await axios.post('http://82.180.136.230:5000/fetchstreamstreams', {
            token: localStorage.getItem('token'),
            selectedStudentClass: studentClass
        })
        if(res.data.responseStatus !== 404){
            setIsClassStreamsLoading(false)
            setClassStreams(res.data)
        }
    }

    useEffect(()=>{
        fetchStudentClassStreams()
        fetchSubjects()
    },[studentClass])

    const inputFieldValidator =() => {
        if(email.trim().length !== 0 && firstName.trim().length !== 0
        && lastName.trim().length !== 0 && studentClass.trim().length !== 0 
        && stream.trim().length !== 0 && contact1.trim().length !== 0 && subject.trim().length !== 0){
            setValidationErrorStatus(false)
        }else{
            setValidationErrorStatus(true)
        }
    }

    const teacherRegistrationHandler = async event => {
        event.preventDefault()
        inputFieldValidator()
        if(!validationErrorStatus){
                let res = await axios.post('http://82.180.136.230:5000/teacherregistration', {
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName,
                    class: studentClass,
                    stream: stream,
                    subject: subject,
                    contact1: contact1,
                    contact2: contact2,
                    email: email,
                    defaultpwd: defaultPassword
                })
                console.log(res.data)
                if(res.data.responseStatus !== 403 || res.data.responseStatus !== 404){
                    setIsRegistrationSuccessful(true)
                    setRegistrationStatusMsg(res.data.responseMsg)
                }else{
                    setIsRegistrationSuccessful(false)
                    setRegistrationStatusMsg(res.data.responseMsg)
                }  
        }
    }
    return(
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
                <Form className="login-form">
                    <div className="mb-3">
                        {<p className={isRegistrationSuccessful === true ? "alert alert-success" : 'none'} style={{textAlign: "center", fontFamily: "akshar", fontStyle: "normal", fontSize: "15px" }}>{registrationStatusMsg}</p>}
                        {<p className={isRegistrationSuccessful === false ? "alert alert-danger" : 'none'} style={{textAlign: "center", fontFamily: "akshar", fontStyle: "normal", fontSize: "15px" }}>{registrationStatusMsg}</p>}
                        {validationErrorStatus && <p style={{ color: "red", textAlign: "center", fontFamily: "akshar", fontStyle: "normal", fontSize: "15px" }}>Please fill in all the fields.</p>}
                    </div>
                    <div className="mb-3">
                        <div className="form-floating mb-3">
                                <input className="form-control" id="floatingInput" placeholder="johndoe" onChange={firstNameHandler} required/>
                                <label htmlFor="floatingInput">First Name</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" onChange={middleNameHandler} placeholder="johndoe"/>
                                <label htmlFor="floatingInput">Middle Name</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" onChange={lastNameHandler} placeholder="johndoe"/>
                                <label htmlFor="floatingInput">Last Name</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <select className="form-select" aria-label="Default select example" onChange={studentClassHandler} required>
                                <option defaultValue>Select Student Class</option>
                                <option value="S1">Senior One</option>
                                <option value="S2">Senior Two</option>
                                <option value="S3">Senior Three</option>
                                <option value="S4">Senior Four</option>
                                <option value="S5">Senior Five</option>
                                <option value="S6">Senior Six</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <select className="form-select" aria-label="Default select example" onChange={streamHandler} required>
                                <option defaultValue>Select Class Stream</option> 
                                {isClassStreamsLoading ? 
                                    <option defaultValue>Select Class Stream</option> : 
                                    classStreams.map((stream => (
                                        <option key={stream.streamid} value={stream.streamid}>{stream.streamname}</option>
                                    )))
                                }
                        </select>
                    </div>
                    <div className="mb-3">
                        <select className="form-select" aria-label="Default select example" onChange={subjectHandler} required>
                                <option defaultValue>Select Subject Responsible For</option> 
                                {isSubjectListLoading ? 
                                    <option defaultValue>Select Subject Responsible For</option> : 
                                    subjectList.map((sub => (
                                        <option key={sub.subjectid} value={sub.subjectid}>{sub.subjectname}</option>
                                    )))
                                }
                        </select>
                    </div>
                    <div className="mb-3">
                        <div className="form-floating mb-3">
                                <input className="form-control" id="floatingInput" placeholder="johndoe" onChange={contact1Handler}/>
                                <label htmlFor="floatingInput">Contact 1</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-floating mb-3">
                                <input className="form-control" id="floatingInput" placeholder="johndoe" onChange={contact2Handler}/>
                                <label htmlFor="floatingInput">Contact 2</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="floatingInput" onChange={emailHandler} placeholder="johndoe"/>
                                <label htmlFor="floatingInput">Email</label>
                        </div>
                    </div>
                    {/* <div className="mb-3">
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={defaultPasswordHandler} required/>
                            <label htmlFor="floatingPassword">Password</label>                
                        </div>
                    </div> */}
                    <div className="mb-3">
                        <button style={{ width: "100%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3"}} onClick={teacherRegistrationHandler}>REGISTER</button>
                    </div>
                </Form>
        </div>
    )
}

export default TeacherRegistration