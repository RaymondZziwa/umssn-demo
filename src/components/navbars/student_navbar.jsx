import logo from '../../imgs/badge.png'
import Logout from '../authentication/logout'
import LoginBtn from '../authentication/login_btn'

const StudentNavbar = ({activeTab, onTabChange}) => {
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="#"><img src={logo} alt='school logo' style={{height:'50px'}}/></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                <a  onClick={()=>onTabChange('dashboard')} className={activeTab === 'dashboard' ? 'nav-link active' : 'nav-link'} aria-current="page" href="/studentdashboard">Dashboard</a>
                </li>
                {/* <li className="nav-item">
                <a className="nav-link" href="#">Student Attendance Information</a>
                </li> */}
                <li className="nav-item">
                <a onClick={()=>onTabChange('student academic records')} className={activeTab === 'student academic records' ? 'nav-link active' : 'nav-link'} href="/studentacademicrecords">Student Past Academic Records</a>
                </li>
                <li className="nav-item">
                <a onClick={()=>onTabChange('save examination data')} className={activeTab === 'save examination data' ? 'nav-link active' : 'nav-link'}  href="/studentmarksheet">Student Recent Performance</a>
                </li>
                <li className="nav-item">
                <a onClick={()=>onTabChange('school class events')} className={activeTab === 'school class events' ? 'nav-link active' : 'nav-link'} href="/schoolclassevents">School Events</a>
                </li>
                <li className="nav-item">
                    {localStorage.getItem('userLoginStatus') ? <Logout /> : <LoginBtn /> }
                </li>
            </ul>
            </div>
        </div>
        </nav>
    )
}

export default StudentNavbar