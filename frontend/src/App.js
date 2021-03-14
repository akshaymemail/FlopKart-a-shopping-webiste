import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import Header from './components/partials/Header'
import Footer from './components/partials/Footer'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen';

function App() {
  return (
    <BrowserRouter>
    <div className="grid-container">
      <Header />
        <main>
          <Route path="/cart/:id?" component = {CartScreen}></Route>
          <Route path="/product/:id" component = {ProductScreen} ></Route>
          <Route path="/" component = {HomeScreen} exact ></Route>  
        </main>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
