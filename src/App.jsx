import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { Suspense, lazy } from "react";
import PaymentManage from "./module/payment/PaymentManage";

const HomePage = lazy(() => import("./pages/HomePage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const ForgotPWPage = lazy(() => import("./pages/ForgotPWPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AdminLayout = lazy(() => import("./layout/AdminLayout"));
const CategoryManage = lazy(() => import("./module/category/CategoryManage"));
const BrandManage = lazy(() => import("./module/brand/BrandManage"));
const VoucherManage = lazy(() => import("./module/voucher/VoucherManage"));

function App() {
  return (
    <>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/contact" element={<ContactPage></ContactPage>}></Route>
          <Route path="/product" element={<ProductPage></ProductPage>}></Route>
          <Route path="/cart" element={<CartPage></CartPage>}></Route>
          <Route
            path="/checkout"
            element={<CheckoutPage></CheckoutPage>}
          ></Route>
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
              path="/admin/brand"
              element={<BrandManage></BrandManage>}
            ></Route>
            <Route
              path="/admin/voucher"
              element={<VoucherManage></VoucherManage>}
            ></Route>
            <Route
              path="/admin/payment"
              element={<PaymentManage></PaymentManage>}
            ></Route>
          </Route>
          <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
        </Routes>
      </Suspense>
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
