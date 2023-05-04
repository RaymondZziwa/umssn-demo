import { Form } from "react-bootstrap";
import logo from '../../../imgs/badge.png'
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

const TeacherActivation = () => {
    const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(undefined)
    const [registrationStatusMsg, setRegistrationStatusMsg] = useState('')
    const [validationErrorStatus, setValidationErrorStatus] = useState(undefined)
    const [arePasswordsMatching, setArePasswordsMatching] = useState(undefined)

    const [tutorIdNumber, setTutorIdNumber] = useState('')
    const [tutorFirstName, setFirstName] = useState('')
    const [tutorMiddleName, setMiddleName] = useState('')
    const [tutorLastName, setLastName] = useState('')

    const [pwd, setPwd] = useState('')
    const confirmPasswordRef = useRef()
    const [confirmPwd, setConfirmPwd] = useState('')

    const studentFirstNameHandler = event => {
        event.preventDefault()
        setFirstName(event.target.value)
    }

    const studentMiddleNameHandler = event => {
        event.preventDefault()
        setMiddleName(event.target.value)
    }

    const studentLastNameHandler = event => {
        event.preventDefault()
        setLastName(event.target.value)
    }


    const tutorIdNumberHandler = event => {
        event.preventDefault()
        setTutorIdNumber(event.target.value)
    }

    const pwdHandler = event => {
        event.preventDefault()
        setPwd(event.target.value)
    }

    const confirmPwdHandler = event => {
        event.preventDefault()
        setConfirmPwd(event.target.value) 
        if(pwd !== confirmPasswordRef.current.value){
            setArePasswordsMatching('Passwords do not match!')
        }else{
            setArePasswordsMatching(null)
        }     
    }

    const inputFieldValidator =() => {
        if(tutorIdNumber.trim().length !== 0 && tutorFirstName.trim().length !== 0
        && tutorLastName.trim().length !== 0 && confirmPwd.trim().length !== 0){
            setValidationErrorStatus(false)
        }else{
            setValidationErrorStatus(true)
        }
    }

    const registrationHandler = async event => {
        event.preventDefault()
        inputFieldValidator()
        if(!validationErrorStatus){
            if(arePasswordsMatching === null){
                let res = await axios.post('http://localhost:5000/teacheractivation',{
                    tutorIdNumber: tutorIdNumber,
                    tutorFirstName: tutorFirstName,
                    tutorMiddleName: tutorMiddleName,
                    tutorLastName: tutorLastName,
                    password: confirmPasswordRef.current.value
                })
                if(res.data.responseStatus !== 403){
                    setIsRegistrationSuccessful(true)
                    setRegistrationStatusMsg(res.data.responseMsg)
                }else{
                    setIsRegistrationSuccessful(false)
                    setRegistrationStatusMsg(res.data.responseMsg)
                }
            }   
        }
    }

    return(
        <>
             <div className="container min-vh-100 d-flex justify-content-center align-items-center">
                <Form className="login-form">
                    <div className="mb-3">
                        <img src={logo} alt="logo" height="180px" style={{marginLeft:'15%'}} />
                        {<p className={isRegistrationSuccessful === true ? "alert alert-success" : 'none'} style={{textAlign: "center", fontFamily: "akshar", fontStyle: "normal", fontSize: "15px" }}>{registrationStatusMsg}</p>}
                        {<p className={isRegistrationSuccessful === false ? "alert alert-danger" : 'none'} style={{textAlign: "center", fontFamily: "akshar", fontStyle: "normal", fontSize: "15px" }}>{registrationStatusMsg}</p>}
                        {validationErrorStatus && <p style={{ color: "red", textAlign: "center", fontFamily: "akshar", fontStyle: "normal", fontSize: "15px" }}>Please fill in all the fields.</p>}
                    </div>
                    <div className="mb-3">
                        <div className="form-floating mb-3">
                                <input className="form-control" id="floatingInput" placeholder="johndoe" onChange={tutorIdNumberHandler} required/>
                                <label htmlFor="floatingInput">Tutor Id Number</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" placeholder="johndoe" onChange={studentFirstNameHandler} required/>
                                <label htmlFor="floatingInput">First Name</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" placeholder="johndoe" onChange={studentMiddleNameHandler} />
                                <label htmlFor="floatingInput">Middle Name</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" placeholder="johndoe" onChange={studentLastNameHandler} required/>
                                <label htmlFor="floatingInput">Last Name</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password"  onChange={pwdHandler} required/>
                            <label htmlFor="floatingPassword">Password</label>                
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password"  onChange={confirmPwdHandler} ref={confirmPasswordRef} required/>
                            <label htmlFor="floatingPassword">Confirm Password</label>
                            {arePasswordsMatching && <span style={{fontSize:'12px',color:'red'}}>{arePasswordsMatching}</span>  }              
                        </div>
                    </div>
                    
                    <div className="mb-3">
                        <button style={{ width: "100%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3"}} onClick={registrationHandler}>REGISTER</button>
                    </div>
                    <div className="mb-3">
                        <p style={{ textAlign: "center", fontSize: "18px", marginTop: "10px", color: "#3E5AA7" }}><Link to="/">Are you already registered? Log In</Link></p>
                    </div>
                    <div className="mb-3">
                        <p style={{ textAlign: "center", fontSize: "18px", marginTop: "10px", color: "#3E5AA7" }}>Terms &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Privacy</p>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default TeacherActivation