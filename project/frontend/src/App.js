import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import ProductDetails from './product/ProductDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/User/Login';
import Register from './components/User/Register';
import { loadUser } from './actions/userAction';
import store from './store';
import Profile from './components/User/Profile'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/routes/ProtectedRoute';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import NewPassword from './components/User/NewPassword';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import OrderSuccess from './components/Cart/OrderSuccess';
function App() {
  const {isAuthenticated,loading,user} = useSelector(state=> state.auth);
  useEffect(()=>{
    store.dispatch(loadUser());
  },[]);
  return (
    <div className="App">
      <link
      rel="stylesheet"
      type="text/css"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <link
      href="//db.onlinewebfonts.com/c/157c6cc36dd65b1b2adc9e7f3329c761?family=Amazon+Ember"
      rel="stylesheet"
      type="text/css"
    />
    <Router>
    <Header></Header>
    <Routes>

  
     <Route path="/" Component={Home} exact/>
     <Route path="/search/:keyword" Component={Home} exact/>
     <Route path="/product/:id" Component={ProductDetails} exact/>
     <Route path="/login" Component={Login}/>
     <Route path="/register" Component={Register}/>
     <Route path="/password/forgot" Component={ForgotPassword}/>
     <Route path="/password/reset/:token" Component={NewPassword}/>
    <Route path='/profile' element={
      <ProtectedRoute isLoggedIn={isAuthenticated}>
        <Profile/>
      </ProtectedRoute>
    } exact/>
    <Route path='/profile/update' element={
      <ProtectedRoute isLoggedIn={isAuthenticated}>
        <UpdateProfile/>
      </ProtectedRoute>
    } exact/>
     <Route path='/password/update' element={
      <ProtectedRoute isLoggedIn={isAuthenticated}>
        <UpdatePassword/>
      </ProtectedRoute>
    } exact/>
    <Route path='/cart' element={
      <ProtectedRoute isLoggedIn={isAuthenticated}>
        <Cart/>
      </ProtectedRoute>
    } exact/>
     <Route path='/shipping' element={
      <ProtectedRoute isLoggedIn={isAuthenticated}>
        <Shipping/>
      </ProtectedRoute>
    } exact/>
      <Route path='/order/confirm' element={
      <ProtectedRoute isLoggedIn={isAuthenticated}>
        <ConfirmOrder/>
      </ProtectedRoute>
    } exact/>
    <Route path='/order/success' element={
      <ProtectedRoute isLoggedIn={isAuthenticated}>
        <OrderSuccess/>
      </ProtectedRoute>
    } exact/>
    
     </Routes>

     <Footer></Footer>

    </Router>
    

     
    </div>
  );
}

export default App;
