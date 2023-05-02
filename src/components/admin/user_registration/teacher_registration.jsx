import { Form } from "react-bootstrap"
import { useState, useEffect } from "react"
import axios from "axios"

const TeacherRegistration = () => {
    const [studentClass, setStudentClass] = useState('')
    const [isClassStreamsLoading, setIsClassStreamsLoading] = useState(true)
    const [classStreams, setClassStreams] = useState(undefined)

    const studentClassHandler = event => {
        event.preventDefault()
        setStudentClass(event.target.value)
    }

    const fetchStudentClassStreams = async () => {
        let res = await axios.post('http://localhost:5000/fetchstreamstreams', {
            selectedStudentClass: studentClass
        })
        if(res.data.responseStatus !== 404){
            setIsClassStreamsLoading(false)
            setClassStreams(res.data)
        }
    }

    useEffect(()=>{
        fetchStudentClassStreams()
    },[studentClass])

    return(
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
                <Form className="login-form">
                    <div className="mb-3">
                        {/* {<p className={isRegistrationSuccessful === true ? "alert alert-success" : 'none'} style={{textAlign: "center", fontFamily: "akshar", fontStyle: "normal", fontSize: "15px" }}>{registrationStatusMsg}</p>}
                        {<p className={isRegistrationSuccessful === false ? "alert alert-danger" : 'none'} style={{textAlign: "center", fontFamily: "akshar", fontStyle: "normal", fontSize: "15px" }}>{registrationStatusMsg}</p>} */}
                        {/* {validationErrorStatus && <p style={{ color: "red", textAlign: "center", fontFamily: "akshar", fontStyle: "normal", fontSize: "15px" }}>Please fill in all the fields.</p>} */}
                    </div>
                    <div className="mb-3">
                        <div className="form-floating mb-3">
                                <input className="form-control" id="floatingInput" placeholder="johndoe"  required/>
                                <label htmlFor="floatingInput">First Name</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" placeholder="johndoe"/>
                                <label htmlFor="floatingInput">Middle Name</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" placeholder="johndoe"/>
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
                        <select className="form-select" aria-label="Default select example" required>
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
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password"  required/>
                            <label htmlFor="floatingPassword">Password</label>                
                        </div>
                    </div>
                    {/* <div className="mb-3">
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password"  onChange={confirmPwdHandler} ref={confirmPasswordRef} required/>
                            <label htmlFor="floatingPassword">Confirm Password</label>
                            {arePasswordsMatching && <span style={{fontSize:'12px',color:'red'}}>{arePasswordsMatching}</span>  }              
                        </div>
                    </div> */}
                    
                    <div className="mb-3">
                        <button style={{ width: "100%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3"}}>REGISTER</button>
                    </div>
                </Form>
        </div>
    )
}

export default TeacherRegistration