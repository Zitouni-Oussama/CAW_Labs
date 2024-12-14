import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // Importer uuid
import Cookies from "js-cookie"; // Importer js-cookie

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import Pagenotfound from "./pages/Pagenotfound";
import MenuDetails from "./pages/MenuDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderTicket from './pages/OrderTicket';

function App() {
  useEffect(() => {
    // Vérifier si l'ID utilisateur existe déjà dans les cookies
    let userId = Cookies.get("user_id");

    if (!userId) {
      // Si l'ID n'existe pas, générer un nouvel ID unique avec uuid
      userId = uuidv4();
      // Stocker l'ID dans un cookie avec une expiration de 7 jours
      Cookies.set("user_id", userId, { expires: 7 });
      console.log("Nouvel ID utilisateur généré:", userId);
    } else {
      console.log("ID utilisateur existant:", userId);
    }
  }, []); // Cette logique ne s'exécute qu'une seule fois au montage du composant

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:id" element={<MenuDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<OrderTicket />} />
          <Route path="*" element={<Pagenotfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
