import logoutIcon from '../../imgs/logout.gif'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate()

    const logoutHandler = event => {
        event.preventDefault()
        localStorage.clear()
        navigate('/')
    }
    return(
        <div onClick={logoutHandler} style={{cursor:'pointer'}}>
            <img src={logoutIcon} alt="log out" style={{height:'40px'}}/> <span>Log out</span> 
        </div>
    )
}

export default Logout