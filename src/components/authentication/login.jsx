import { useState } from "react"
import { Form } from "react-bootstrap";
import AdminLogin from "./admin_login_form/admin_login_form"
import TeacherLogin from "./teacher_login_form/teacher_login_form"
import StudentLogin from "./student_login_form/student_login_form"
import logo from '../../imgs/badge.png'
import { Link } from "react-router-dom";

const Login = () => {
    const [role, setRole] = useState('')

    const handleRoleData = event => {
        event.preventDefault()
        setRole(event.target.value)
    }
    return(
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
            <Form className="login-form">
                <div className="mb-3">
                    <img src={logo} alt="logo" height="180px" style={{marginLeft:'25px'}}/>
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
                    <StudentLogin />
                }
                <div className="mb-3">
                    <button style={{ width: "100%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3" }}>LOGIN</button>
                </div>
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