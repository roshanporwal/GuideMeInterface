import Api from "./serverapis";
/**
 * The action that we are performing is defined here
 * There are multiple actions that need to be performed
 */
export async function LoginUser(dispatch,loginPayload){
      dispatch({ type: 'REQUEST_LOGIN' });
      await Api.post('/login',{
            email: loginPayload.email,
            password: loginPayload.password,
        }).then((response) => {
            let data = response.data;
            if(data.status === true) {
                dispatch({ type: 'LOGIN_SUCCESS', payload: data });
                localStorage.setItem('GuideMeUser', JSON.stringify(data));
                return true;
            }
            else {
                dispatch({ type: 'LOGIN_ERROR', error: 'Invalid credentials.' });
                return false;
            }
        }).catch((error) => {
            dispatch({ type: 'LOGIN_ERROR', error: error });
        });
}

export async function logout(dispatch) {

    dispatch({ type: 'LOGOUT' });
    await Api.get('/logout', {headers: {'Authorization': authHeader()}})
    .then((response) => {
        if(response.data.status === true) {
          localStorage.removeItem('GuideMeUser');
        }
    })
  .catch((error) => {
    console.error(error);
  });
}