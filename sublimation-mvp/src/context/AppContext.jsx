import { createContext, useEffect, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });
  const [orders, setOrders] = useState(() => {
    const stored = localStorage.getItem('orders');
    return stored ? JSON.parse(stored) : [];
  });
  const [products, setProducts] = useState([
    { id: 1, name: 'Camisa Manga Corta', basePrice: 25, colors: ['blanco', 'negro', 'azul', 'rojo'], sizes: ['S', 'M', 'L', 'XL'] }
  ]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  return (
    <AppContext.Provider value={{ user, setUser, cart, setCart, orders, setOrders, products, setProducts }}>
      {children}
    </AppContext.Provider>
  );
};
