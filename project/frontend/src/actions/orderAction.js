import { CREATE_ORDER_REQUEST,CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL,CLEAR_ERRORS } from "../constants/orderConstant";
import axios from "axios";
export const createOrder =(orderData)=> async(dispatch)=>{
        try{
            dispatch({
                type: CREATE_ORDER_REQUEST
            })
            
            const {data} = await axios.post(`/api/v1/order/new`,orderData);
            dispatch({
                 type: CREATE_ORDER_SUCCESS,
                 payload: data.order
            })
        } catch(error)
        { 
            dispatch({
                type:  CREATE_ORDER_FAIL,
                payload: error.response.data.message
            })

        }

}
export const clearErrors =()=> async (dispatch)=>{
    dispatch({
    type: CLEAR_ERRORS
    });
}