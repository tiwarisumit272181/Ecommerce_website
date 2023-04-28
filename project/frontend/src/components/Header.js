import React, { Fragment } from 'react'
import '../App.css'
import Search from './Search';
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import {useAlert} from 'react-alert';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import {logout} from '../actions/userAction';
const Header = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const logoutHandler = ()=>{
    dispatch(logout());
    alert.success('logout successfully')
  }
  const {user, loading} = useSelector(state=>state.auth);
  const {cartItems} = useSelector(state=>state.cart);
  return (
   
   <Fragment>
        
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <img src="./images/logo.png" />
        </div>
      </div>
      <div className="col-12 col-md-6 mt-2 mt-md-0">

     <Search/>
      
        
      
       </div>
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
      <Link id="cart" className="ml-3" to='/cart'>Cart</Link>
        <span className="ml-1" id="cart_count">{Object.keys(cartItems).length}</span>
        {user? (
                      <div className="dropdown">
                        <Link to="!#" className='dropbtn' 
                        type="button" id = "dropDownMenuButton" data-toggle="dropdown" 
                        aria-haspopup="true"  aria-expanded="false">
                          <figure className='avatar avatar-nav'>
                            <img src ={user.avatar&& user.avatar.url} 
                            alt={user&user.name}
                            className='rounded-circle'/>
                          </figure>
                          <span>{user?user.name:''}</span>
                          </Link>
                      
                          <div className="dropdown-content" aria-labelledby="dropDownMenuButton">
                          <Link  to='/profile'>Profile</Link>
                            {user&&user.role!=='admin'?<Link to='/orders/me'>Orders</Link>:<Link to='/orders/me'>Dashboard</Link>}
                            <Link  to='/' onClick={logoutHandler}>Logout</Link>
                            </div>

                      </div>
        ):!loading&&  <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>}

        
      
        
      </div>
    </nav>
   </Fragment>
  )
}

export default Header