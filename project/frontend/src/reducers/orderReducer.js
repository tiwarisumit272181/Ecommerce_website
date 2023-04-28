import { CREATE_ORDER_REQUEST,CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL } from "../constants/orderConstant";
import { CLEAR_ERRORS } from "../constants/productConstant";
 export const newOrderReducer = (state={},action)=>{
    switch(action.type)
    {
        case CREATE_ORDER_REQUEST:
            return{
                ...state,
                loading: true
            }
        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                loading:false,
                error: null
            }
        default:
            return state;
        
        }
 }