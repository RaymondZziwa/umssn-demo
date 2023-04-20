const TeacherNavbar  = ({activeTab, onTabChange}) => {
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                <a  onClick={()=>onTabChange('dashboard')} className={activeTab === 'dashboard' ? 'nav-link active' : 'nav-link'} aria-current="page" href="/teacherdashboard">Dashboard</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="">Student Data</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Student Attendance Data</a>
                </li>
                <li className="nav-item">
                <a onClick={()=>onTabChange('save examination data')} className={activeTab === 'save examination data' ? 'nav-link active' : 'nav-link'}  href="/importmarksheet">Save Examination Data</a>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    )
}

export default TeacherNavbar