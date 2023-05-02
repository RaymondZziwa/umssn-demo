import {Form} from 'react-bootstrap'

const StudentRegistration = () => {
    return(
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
            <Form className="login-form">
                <input className="form-control" placeholder="Class" />
                <input className="form-control" placeholder="Stream" />
                <input className="form-control" type="file" multiple placeholder="submit mark sheet" accept=".xlsx, .xls, .csv"/>
                <button className="btn btn-primary"  style={{width:'100%'}}>Register</button>
            </Form>
        </div>
    )
}

export default StudentRegistration