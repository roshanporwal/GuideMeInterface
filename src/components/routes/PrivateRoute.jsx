import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthState } from '../../context';

//Routes that need Authenticated User
const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    console.log('In private route');
    const userDetails = useAuthState();
    let location = useLocation();
    if(!Boolean(userDetails.token))
    {
        return navigate('/',{
            state:{
                from:location
            }
        }) ;
    }
    return children;
};

export default PrivateRoute;