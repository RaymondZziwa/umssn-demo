import powerIcon from '../../imgs/logout.gif'
import { useNavigate } from 'react-router-dom'

const LoginBtn = () => {
    const navigate = useNavigate()

    const loginRedirectHandler = event => {
        event.preventDefault();
        navigate('/')
    }
    return(
        <div onClick={loginRedirectHandler} style={{cursor:'pointer'}}>
            <img src={powerIcon} alt="log In" style={{height:'40px'}}/> <span>Log In</span> 
        </div>
    )
}

export default LoginBtn