import {Row, Col} from "react-bootstrap"
import { useEffect, useState } from "react";
import StudentNavbar from "../../navbars/student_navbar";
import axios from "axios";
import loading from '../../../imgs/Loading.gif'

const StaffContacts = () => {
    const [activeTab, setActiveTab] = useState('staff contact list');
    const [staffcontactList, setStaffContactList] = useState()
    const [isStaffContactListLoading, setIsStaffContactListLoading] = useState(undefined)

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const fetchStaffContacts = async () => {
        let res = await axios.post('http://82.180.136.230:5000/fetchstaffdata',{
            token: localStorage.getItem('token')
        })

        if(res.data.responseStatus !== 404 || res.data.responseStatus !== 403){
            setIsStaffContactListLoading(false)
            setStaffContactList(res.data)
        }else if(res.data.responseStatus === 404){
            setIsStaffContactListLoading(true)
        }
    }

    useEffect(() => {
        fetchStaffContacts()
    }, [])
    return(
        <Row>
        <Col sm='12' md='12' lg='12' xl='12'>
           <StudentNavbar activeTab={activeTab} onTabChange={handleTabChange}/>
       </Col>
       <Row>
           <div className="col-md-6 offset-md-3">
               <h4 style={{textAlign:'center'}}>Staff Contacts</h4>
               <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">First Name</th>
                                <th scope="col">Middle Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Class</th>
                                <th scope="col">Stream</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Contact 1</th>
                                <th scope="col">Contact 2</th>
                                <th scope="col">Email</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {(!isStaffContactListLoading && typeof staffcontactList === "object") ?
                                staffcontactList.map((contact => (
                                    <tr key={contact.firstname}>
                                        <td>{contact.firstname}</td>
                                        <td>{contact.midddlename}</td>
                                        <td>{contact.lastname}</td>
                                        <td>{contact.class}</td>
                                        <td>{contact.stream}</td>
                                        <td>{contact.subject}</td>
                                        <td><a href={`tel:${contact.contact1}`}>{contact.contact1}</a></td>
                                        <td><a href={`tel:${contact.contact2}`}>{contact.contact2}</a></td>
                                        <td>{contact.email}</td>
                                    </tr>
                                ))) :
                                <tr>
                                    <p style={{textAlign:'center'}}><img src={loading} alt='loading' style={{height:'80px'}}/><br></br>Loading staff data...</p>
                                </tr>
                            }
                        </tbody>
                    </table>
           </div>
       </Row>
   </Row>
    )
}

export default StaffContacts