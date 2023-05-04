import { useState } from "react"

const StudentLogin = ({loginHandler}) => {
    const [studentIdNumber, setStudentIdNumber] = useState('')
    const [password, setPassword] = useState('')

    const studentIdNumberHandler = event => {
        event.preventDefault()
        setStudentIdNumber(event.target.value)
    }
    
    const pwdHandler = event => {
        event.preventDefault()
        setPassword(event.target.value)
    }
    return(
        <>
            <div className="mb-3">
                <div className="form-floating mb-3">
                    <input className="form-control" id="floatingInput" placeholder="johndoe" onChange={studentIdNumberHandler} required/>
                    <label htmlFor="floatingInput">Student Id Number</label>
                </div>
            </div>          
            <div className="mb-3">
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={pwdHandler} required/>
                    <label htmlFor="floatingPassword">Password</label>                
                </div>
            </div>
            <div className="mb-3">
                    <button style={{ width: "100%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3" }} onClick={event => loginHandler(event, studentIdNumber, password)}>LOGIN</button>
            </div>
        </>
    )
}

export default StudentLogin