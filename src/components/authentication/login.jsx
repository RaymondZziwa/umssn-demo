import { useState } from "react"
import { Form } from "react-bootstrap";
import AdminLogin from "./admin_login_form/admin_login_form"
import TeacherLogin from "./teacher_login_form/teacher_login_form"
import StudentLogin from "./student_login_form/student_login_form"
import logo from '../../imgs/badge.png'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
const Login = () => {
    const [role, setRole] = useState('')
    const [isLoginSuccessful, setIsLoginSuccessful] = useState(undefined)
    const [loginStatusMsg, setLoginStatusMsg] = useState('')
    const navigate = useNavigate()
    const handleRoleData = event => {
        event.preventDefault()
        setRole(event.target.value)
    }

    const loginHandler = async (event, studentIdNumber, password) => {
        event.preventDefault()
        if(studentIdNumber.trim().length !== 0 && password.trim().length !== 0){
            let res = await axios.post('http://localhost:5000/login',{
                role: role,
                studentIdNumber: studentIdNumber,
                password: password
            })
            if(res.data.responseStatus !== 404){
                setIsLoginSuccessful(true)
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('studentIdNumber', res.data.studentIdNumber)
                localStorage.setItem('userLoginStatus', true)
                navigate(`${res.data.redirectPath}`)
            }else{
                setIsLoginSuccessful(false)
                setLoginStatusMsg(res.data.responseMsg)
            }
        }
    }
    return(
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
            <Form className="login-form">
                <div className="mb-3">
                    <img src={logo} alt="logo" height="180px" style={{marginLeft:'25px'}}/>
                    {<p className={isLoginSuccessful === false ? "alert alert-danger" : 'none'} style={{textAlign: "center", fontFamily: "akshar", fontStyle: "normal", fontSize: "15px" }}>{loginStatusMsg}</p>}
                    {/* <p style={{ color: "#3452A3", textAlign: "center", fontFamily: "akshar", fontStyle: "normal", fontSize: "22px" }} className="login-header">UMSSN</p> */}
                </div>
                <div className="mb-3">
                    <select className="form-select" aria-label="Default select example" onChange={handleRoleData}>
                        <option defaultValue>Role</option>
                        <option value="admin">Administrator</option>
                        <option value="teacher">Teacher</option>
                        <option value="student">Student / Parent</option>
                    </select>
                </div>
                {role === 'admin' && 
                    <AdminLogin />
                }
                {role === 'teacher' && 
                    <TeacherLogin />
                }
                {role === 'student' &&
                    <StudentLogin loginHandler={loginHandler}/>
                }
                <div className="mb-3">
                    <p style={{ textAlign: "center", fontSize: "18px", marginTop: "10px", color: "#3E5AA7" }}><Link to="/register">Are you a new parent? Register</Link></p>
                </div>
                <div className="mb-3">
                    <p style={{ textAlign: "center", fontSize: "18px", marginTop: "10px", color: "#3E5AA7" }}>Terms &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Privacy</p>
                </div>
            </Form>
        </div>
    )
}

export default Login