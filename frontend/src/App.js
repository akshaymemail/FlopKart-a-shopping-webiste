import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import Header from './components/partials/Header'
import Footer from './components/partials/Footer'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen';
import SignInScreen from './screens/SignInScreen';
import RegisterScreen from './screens/RegisterScreen'
import shippingAddressScreen from './screens/ShippingAddressScreen'
import PaymentMethods from './screens/PaymentMethods';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  return (
    <BrowserRouter>
    <div className="grid-container">
      <Header />
        <main>
          <Route path="/" component = {HomeScreen} exact ></Route>
          <Route path="/cart/:id?" component = {CartScreen}></Route>
          <Route path="/product/:id" component = {ProductScreen} ></Route>
          <Route path="/signin" component = {SignInScreen}></Route>
          <Route path="/register" component = {RegisterScreen}></Route> 
          <Route path="/shipping" component={shippingAddressScreen}></Route> 
          <Route path="/payment" component = {PaymentMethods}></Route>
          <Route path="/orders/:id" component = {OrderScreen}></Route>
          <Route path="/placeorder" component = {PlaceOrderScreen}></Route>
          <Route path="/orderhistory" component = {OrderHistoryScreen}></Route>
          <Route path="/profile" component = {ProfileScreen}></Route>
        </main>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
