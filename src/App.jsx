import { Route, Routes } from "react-router-dom";
import "./App.css";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import ForgotPWPage from "./pages/ForgotPWPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/contact" element={<ContactPage></ContactPage>}></Route>
        <Route path="/product" element={<ProductPage></ProductPage>}></Route>
        <Route path="/cart" element={<CartPage></CartPage>}></Route>
        <Route path="/checkout" element={<CheckoutPage></CheckoutPage>}></Route>
        <Route
          path="/product/:productId"
          element={<ProductDetailPage></ProductDetailPage>}
        ></Route>
        <Route path="/login" element={<SignInPage></SignInPage>}></Route>
        <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
        <Route
          path="/resetpassword"
          element={<ForgotPWPage></ForgotPWPage>}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
