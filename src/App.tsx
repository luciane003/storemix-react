import {HashRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './paginas/Home';
import Details from './paginas/Details';
import './index.css';
import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import Cart from './paginas/Cart';

function App() {
  const [cartCount, setCartCount] = useState(0)

  const [cart, setCart] = useState<{ image: string; name: string; price: string; quantity: number }[]>([])
  
  const updateQuantity = (nameProduct: string, newQuantity: number) => {
    const changeQuantity = cart.map(product => {
      if(product.name === nameProduct) {
      return {
        ...product, 
        quantity: newQuantity
      };
      }else{
        return product;
      }
    });
    setCart(changeQuantity);
  }

  const handleAddToCart = (product: { image: string, name: string, price: string }) => {
    const existingProduct = cart.find(item => item.name === product.name);

    if (existingProduct) {
      const updatedCart = cart.map(item => {
        if (item.name === product.name) {
          return {
            ...item,
            quantity: item.quantity + 1
          }
        } else {
          return item;
        }
      });

      setCart(updatedCart)
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    //Atualiza a quantidade no ícone
    setCartCount(prev => prev + 1);
  }

  const handleRemoveFromCart = (name: string) => {
    setCart(prev => {
      const newCart = prev.filter(item => item.name !== name);

      //Arualiza o contador baseado no carrinho atualizado
      setCartCount(newCart.reduce((cartTotal, item) => cartTotal + item.quantity, 0));

      return newCart;
    });
  };

  return (
    <Router>
      <header className="bg-primarioHover h-14 px-8 pt-3 flex items-center justify-between shadow-md">
        <h1 className="text-white text-2xl font-bold tracking-wide select-none">🛍️ StoreMix</h1>

        <div className="relative select-none">
          <Link to='/cart'>
            <FaShoppingCart className="text-3xl text-white hover:scale-110 transition"/>
          </Link>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-secundario text-white text-xs font-bold rounded-full px-2 py-0.5 shadow">
              {cartCount}
            </span>
          )}
        </div>
      </header>

      <Routes>
        <Route path='/' element={<Home />}
        />

        <Route path='/details/:nome' element={<Details onAddToCart={handleAddToCart} />}
        />

        <Route path='/Cart' element={
          <Cart
          cart={cart}
          updateQuantity={updateQuantity}
          handleRemoveFromCart={handleRemoveFromCart}
         />}
        />

      </Routes>  
    </Router>
  )
}

export default App;