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
import AdminLayout from "./layout/AdminLayout";
import DashboardPage from "./pages/DashboardPage";
import PageNotFound from "./pages/PageNotFound";
import AddNewBrand from "./module/brand/AddNewBrand";
import BrandManage from "./module/brand/BrandManage";
import UpdateBrand from "./module/brand/UpdateBrand";
import { ToastContainer } from "react-toastify";
import CategoryManage from "./module/category/CategoryManage";

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
        <Route element={<AdminLayout></AdminLayout>}>
          <Route
            path="/admin"
            element={<DashboardPage></DashboardPage>}
          ></Route>
          <Route
            path="/admin/category"
            element={<CategoryManage></CategoryManage>}
          ></Route>
          <Route
            path="/admin/addBrand"
            element={<AddNewBrand></AddNewBrand>}
          ></Route>
          <Route
            path="/admin/updateBrand"
            element={<UpdateBrand></UpdateBrand>}
          ></Route>
          <Route
            path="/admin/brand"
            element={<BrandManage></BrandManage>}
          ></Route>
        </Route>
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
