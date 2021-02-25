import React from 'react'
import data from './data';
import ProductCard from './components/ProductCard'
import Header from './components/partials/Header'
import Footer from './components/partials/Footer'

function App() {
  return (
    <div className="grid-container">
      <Header />
        <main>
            <div className="row center">
               {data.products.map((product) => 
                   <ProductCard product = {product} key={product.id}/>
                 )}  
            </div>
        </main>
      <Footer />
    </div>
  );
}

export default App;
