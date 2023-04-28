import React from 'react'
import { Fragment } from 'react'
import MetaData from '../MetaData';
import CheckOutSteps from './CheckOutSteps';

import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createOrder } from '../../actions/orderAction';
const ConfirmOrder = () => {
  const {cartItems} = useSelector(state=>state.cart);
  const {user} = useSelector(state=>state.auth);
  const {shippingInfo} = useSelector(state=>state.cart);
  //Calulate order price
  let itemsPrice=0;
  const orderItems = [];
  {cartItems.map(item=>{
    itemsPrice+=Number(item.price)*Number(item.quantity);
    orderItems.push({
      name: item.name,
      quantity: item.quantity,
      product: item.product,
      price: item.price,
    });
  })}
  const dispatch = useDispatch();
  let shippingPrice= itemsPrice>=200? 0: 40;
  let taxPrice = Number((0.05*itemsPrice)).toFixed(2);
  let totalPrice = (Number(itemsPrice)+Number(shippingPrice)+Number(taxPrice)).toFixed(2);
  const navigate = useNavigate();
  const proceedToPayment =()=>{
   const data ={
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice,
    taxPrice,
    totalPrice
   }
   sessionStorage.setItem('orderInfo',JSON.stringify(data));
   console.log();
   const formData = {
    orderItems: orderItems,
    itemPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice,
    taxPrice: taxPrice,
    totalPrice: totalPrice,
    paymentInfo: {
      id: 'xyz',
      status: 'success',
    },
    shippingInfo: {
      address: shippingInfo.address,
      city: shippingInfo.city,
      phoneNo: shippingInfo.phoneNumber,
      postalCode: shippingInfo.postalCode,
      country: shippingInfo.country,
    },
  };
   dispatch(createOrder(formData));
   navigate('/order/success');
   
  }
  return (
    <Fragment>
     <MetaData title={'Confirm Order'}/>
     <CheckOutSteps confirmOrder/>
     <div className="container container-fluid">
        
        <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-confirm">

                <h4 className="mb-3">Shipping Info</h4>
                <p><b>Name:</b> {user&&user.name}</p>
                <p><b>Phone:</b> {shippingInfo.phoneNumber}</p>
                <p className="mb-4"><b>Address:</b> {shippingInfo.address}{shippingInfo.city}{shippingInfo.country}</p>
                
                <hr />
                <h4 className="mt-4">Your Cart Items:</h4>
               
                {cartItems&&cartItems.map(item=>(
                  <Fragment>
                       <hr />
                <div className="cart-item my-1">
                    <div className="row">
                        <div className="col-4 col-lg-2">
                            <img src={item.image}alt="Laptop" height="45" width="65"/>
                        </div>

                        <div className="col-5 col-lg-6">
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>


                        <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                            <p>{item.quantity} x Rs {item.price} = <b>Rs {item.quantity*item.price}</b></p>
                        </div>

                    </div>
                </div>
                <hr />

        
			
                  </Fragment>
                ))}
             </div>
			<div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">Rs {itemsPrice}</span></p>
                        <p>Shipping: <span className="order-summary-values">Rs {shippingPrice}</span></p>
                        <p>Tax:  <span className="order-summary-values">Rs {taxPrice}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">Rs {totalPrice}</span></p>

                        <hr />
                        <button id="checkout_btn" onClick={proceedToPayment} className="btn btn-primary btn-block">Proceed to Payment</button>
                    </div>
                </div>
			
			
        </div>
    </div>
    </Fragment>
  )
}

export default ConfirmOrder