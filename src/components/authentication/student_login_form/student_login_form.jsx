import { useState } from "react"

const StudentLogin = () => {
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [studentClass, setStudentClass] = useState('')
    const [studentStream, setStudentStream] = useState('')
    const [password, setPassword] = useState('')

    return(
        <>
            <div className="mb-3">
                <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="johndoe" />
                        <label for="floatingInput">First Name</label>
                </div>
            </div>
            <div className="mb-3">
                <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="johndoe" />
                        <label for="floatingInput">Middle Name</label>
                </div>
            </div>
            <div className="mb-3">
                <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="johndoe"  />
                        <label for="floatingInput">Last Name</label>
                </div>
            </div>
            <div className="mb-3">
                <select class="form-select" aria-label="Default select example" >
                        <option selected>Select Student Class</option>
                        <option value="s1">Senior One</option>
                        <option value="s2">Senior Two</option>
                        <option value="s3">Senior Three</option>
                        <option value="s4">Senior Four</option>
                        <option value="s5">Senior Five</option>
                        <option value="s6">Senior Six</option>
                </select>
            </div>
            <div className="mb-3">
                <select class="form-select" aria-label="Default select example" >
                        <option selected>Select Class Stream</option>
                        <option value="s1n">Senior One North</option>
                        <option value="s1e">Senior One East</option>
                        <option value="s1s">Senior One South</option>
                        <option value="s1w">Senior One West</option>
                </select>
            </div>
            <div className="mb-3">
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"  />
                    <label for="floatingPassword">Password</label>                
                </div>
            </div>
        </>
    )
}

export default StudentLogin