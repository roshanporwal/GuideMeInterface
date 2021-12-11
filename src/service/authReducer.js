/** So here we define a reducer and
 *  its dispatch function so for all Login Logout Handeling 
*/


//Get current user and its token
let user = localStorage.getItem('GuideMeUser')
	? JSON.parse(localStorage.getItem('GuideMeUser')).user_details
	: '';
let token = localStorage.getItem('GuideMeUser')
	? JSON.parse(localStorage.getItem('GuideMeUser')).auth_token
	: '';

//store that details as a initial state
//Also initialize loading and errors this will be used everywhere
export const initialState = {
    user:user,
    token:token,
    loading:false,
    error:null,
}

// initial state takes in the initial value of the state 
// and the action to performed to give a new state its better than 
// writing different functions for the same state 
export const AuthReducer = (initialState,action) => {
    switch (action.type) {
        //Used to check if user is already logged in
        case 'REQUEST_LOGIN':
            return {
                ...initialState,
                loading:true
            }

        //used to check if the login was successful
        case 'LOGIN_SUCCESS':
            return {
                ...initialState,
				user: action.payload.user_details,
				token: action.payload.auth_token,
                loading:false,
            }

        //used to empty the initialState
        case 'LOGOUT':
            return {
				...initialState,
				user: '',
				token: '',
			};           

        //used to check if there is a login error
        case 'LOGIN_ERROR':
            return {
				...initialState,
				loading: false,
				error: action.error,
			};
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }




}