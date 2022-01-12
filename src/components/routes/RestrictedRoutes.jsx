import { useNavigate } from 'react-router-dom';
import { useAuthState } from '../../service/authContext';

//Routes that need to be bypassed if User is logged in
const RestrictedRoute = ({ children }) => {
    const navigate = useNavigate();
    const userDetails = useAuthState();
    if(Boolean(userDetails.token))
    {
        return navigate('/dashboard');
    }
    return children;
};

export default RestrictedRoute;