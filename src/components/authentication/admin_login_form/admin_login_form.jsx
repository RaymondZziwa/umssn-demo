import { useState } from "react"

const AdminLogin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState()
    return(
        <>
            <div className="mb-3">
                <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="johndoe" style={{ color: "#8CA6FE;" }} />
                        <label for="floatingInput">Username</label>
                </div>
            </div>
            <div className="mb-3">
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                    <label for="floatingPassword">Password</label>                </div>
            </div>
        </>
    )
}

export default AdminLogin