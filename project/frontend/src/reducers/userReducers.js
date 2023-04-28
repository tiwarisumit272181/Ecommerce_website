import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REG_REQUEST,
    REG_SUCCESS,
    REG_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_RESET,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_RESET,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstant';

export const authReducer = (state ={user:{}},action)=>{
    switch(action.type){
        case LOGIN_REQUEST:
        case LOAD_USER_REQUEST:
        case REG_REQUEST:
            return{
                loading:true,
                isAuthenticated:false
            }
        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
        case REG_SUCCESS:
            return {
                ...state,
                loading:false,
                isAuthenticated:true,
                user: action.payload

            }
        case LOGOUT_USER_SUCCESS:
            return {
                loading: false,
                isAuthenticated:false,
                user:null
            }
        case LOAD_USER_FAIL:
                return{
                    loading:false,
                    isAuthenticated:false,
                    user:null,
                    error: action.payload
                }
        case REG_FAIL:
        case LOGIN_FAIL:
            return{
                ...state,
                loading:false, 
                isAuthenticated:false,
                user: null,
                error: action.payload
            }
        case LOGOUT_USER_FAIL:
            return{
                ...state,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
         default:
            return state;
    }

}
export const userReducer =(state={},action)=>{
    switch(action.type){
       case UPDATE_PROFILE_REQUEST:
       case UPDATE_PASSWORD_REQUEST:
       return{
            ...state,
            loading:true
       }
       case UPDATE_PROFILE_SUCCESS:
       case UPDATE_PASSWORD_SUCCESS:
        return {
            ...state,
            loading:false,
            isUpdated:action.payload
        }
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
            return {
                ...state,
                isUpdated:false
                
            }
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error:null
                }
       default:
        return state;
    }
}

export const forgotPasswordReducer =(state={},action)=>{
    switch(action.type){
      
       case FORGOT_PASSWORD_REQUEST:  
       case NEW_PASSWORD_REQUEST:
       return{
            ...state,
            loading:true,
            error:null
       }
       case FORGOT_PASSWORD_SUCCESS:
        return {
            ...state,
            loading:false,
           message:action.payload
        }
       case NEW_PASSWORD_SUCCESS:
        return{
            ...state,
            success: action.payload
        }
        case NEW_PASSWORD_FAIL:
        case FORGOT_PASSWORD_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error:null
                }
       default:
        return state;
    }
}
