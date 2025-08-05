import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import All from "./pages/All/All";
import Home from "./pages/Home/Home";
import Women from "./pages/Women/Women";
import Men from "./pages/Men/Men";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Cart from "./pages/Cart/Cart";
import NavigationBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import NewArrivals from "./pages/NewArrivals/NewArrivals";
import OfferTimer from "./components/OfferTimer/OfferTimer";
import Product from "./pages/Product/Product";
import { AuthProvider } from "./contexts/AuthContext";

import "./App.css";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <NavigationBar />
          <Container>
            <OfferTimer />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/all" element={<All />} />
              <Route path="/women" element={<Women />} />
              <Route path="/men" element={<Men />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/new-arrivals" element={<NewArrivals />} />
              <Route path="/products/:product_id" element={<Product />} />
            </Routes>
          </Container>
        </Router>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
