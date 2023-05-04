import { useState } from "react"

const TeacherLogin = ({loginHandler}) => {
    const [tutorIdNumber, setTutorIdNumber] = useState('')
    const [tutorPassword, setTutorPassword] = useState('')

    const tutorIdNumberHandler = event => {
        event.preventDefault()
        setTutorIdNumber(event.target.value)
    }
    
    const pwdHandler = event => {
        event.preventDefault()
        setTutorPassword(event.target.value)
    }
    return(
        <>
            <div className="mb-3">
                <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="johndoe" onChange={tutorIdNumberHandler}/>
                        <label for="floatingInput">Teacher Id</label>
                </div>
            </div>
            <div className="mb-3">
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={pwdHandler}/>
                    <label for="floatingPassword">Password</label>                
                </div>
            </div>
            <div className="mb-3">
                    <button style={{ width: "100%", border: "none", color: "white", height: "45px", backgroundColor: "#3452A3" }} onClick={event => loginHandler(event, tutorIdNumber, tutorPassword)}>LOGIN</button>
            </div>
        </>
    )
}

export default TeacherLogin