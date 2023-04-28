import React from 'react'
import { Fragment } from 'react'
import MetaData from '../MetaData';

import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart,removeItemFromCart } from '../../actions/cartActions';
const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {cartItems} = useSelector(state=>state.cart);
    const increaseQty =(id,quantity,stock)=>{
      const  qty=quantity+1;
        if(qty>stock)
        {
            return;
        }
      
    
        dispatch(addItemToCart(id,qty))

}
const decreaseQty =(id,quantity)=>{
   
   const qty=quantity-1;
        if(qty<1)
        {
            return;
        }
    
        dispatch(addItemToCart(id,qty))
}
const removeCartItemHandler =(id)=>{
    dispatch(removeItemFromCart(id));
}
const checkOutHandler =()=>{
    navigate('/shipping');
}
let count=0;
let total=0;
 cartItems.map(item=>(<> {total+=Number(item.quantity)*(item.price)}{count+=item.quantity}</>))
  return (
    <Fragment>
        <MetaData title="Your Cart"/>
     
   { Object.keys(cartItems).length===0?<h2 className="mt-5">Your Cart is Empty</h2>:
    <Fragment>
      <h2 className="mt-5">Your Cart: <b>{Object.keys(cartItems).length} items</b></h2>
        
        <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
                {cartItems.map(item=>(
                    <Fragment>
                        <hr/>
                        <div className="cart-item">
                    <div className="row">
                        <div className="col-4 col-lg-3">
                            <img src={item.image}alt="Laptop" height="90" width="115"/>
                        </div>

                        <div className="col-5 col-lg-3">
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>


                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p id="card_item_price">Rs {item.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={()=>decreaseQty(item.product,item.quantity)}>-</span>
                                <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

								<span className="btn btn-primary plus" onClick={()=>increaseQty(item.product,item.quantity,item.stock)}>+</span>
                            </div>
                        </div>
                        
                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                            <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={()=>removeCartItemHandler(item.product)}></i>
                        </div>

                    </div>
                </div>
                
                    </Fragment>
                ))}
              
                <hr />
            </div>

            <div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Subtotal:  <span className="order-summary-values">{count}</span></p>
                    <p>Est. total: <span className="order-summary-values">Rs{total}</span></p>
    
                    <hr />
                    <button id="checkout_btn" onClick={checkOutHandler} className="btn btn-primary btn-block">Check out</button>
                </div>
            </div>
        </div>
    </Fragment>
}
    </Fragment>
  )
}

export default Cart