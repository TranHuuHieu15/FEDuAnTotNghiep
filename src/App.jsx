import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { Suspense, lazy } from "react";
import AccountLayout from "./layout/AccountLayout";
import AccountInfo from "./module/information/AccountInfo";
import AccountAddress from "./module/information/AccountAddress";
import AccountOrder from "./module/information/AccountOrder";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const ForgotPWPage = lazy(() => import("./pages/ForgotPWPage"));
const CheckMailPage = lazy(() => import("./pages/CheckMailPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AdminLayout = lazy(() => import("./layout/AdminLayout"));
const CategoryManage = lazy(() => import("./module/category/CategoryManage"));
const BrandManage = lazy(() => import("./module/brand/BrandManage"));
const VoucherManage = lazy(() => import("./module/voucher/VoucherManage"));
const PaymentManage = lazy(() => import("./module/payment/PaymentManage"));
const DiscountManage = lazy(() => import("./module/discount/DiscountManage"));
const ProblemManage = lazy(() => import("./module/problem/ProblemManage"));
const FeedbackManage = lazy(() => import("./module/feedback/FeedbackManage"));
const EvalueateManage = lazy(() => import("./module/evaluate/EvalueateManage"));
const ColorManage = lazy(() => import("./module/color/ColorManage"));
const VoucherPage = lazy(() => import("./pages/VoucherPage"));
const ProductManagePage = lazy(() => import("./module/product/ProductManage"));

function App() {
  return (
    <>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/contact" element={<ContactPage></ContactPage>}></Route>
          <Route path="/about" element={<AboutUsPage></AboutUsPage>}></Route>
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
          <Route
            path="/checkmail"
            element={<CheckMailPage></CheckMailPage>}
          ></Route>

          <Route path="/voucher" element={<VoucherPage></VoucherPage>}></Route>

          <Route element={<AdminLayout></AdminLayout>}>
            <Route
              path="/admin"
              element={<DashboardPage></DashboardPage>}
            ></Route>
            <Route
              path="/admin/product"
              element={<ProductManagePage></ProductManagePage>}
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
            <Route
              path="/admin/problem"
              element={<ProblemManage></ProblemManage>}
            ></Route>
            <Route
              path="/admin/feedback"
              element={<FeedbackManage></FeedbackManage>}
            ></Route>
            <Route
              path="/admin/discount"
              element={<DiscountManage></DiscountManage>}
            ></Route>
            <Route
              path="/admin/evaluate"
              element={<EvalueateManage></EvalueateManage>}
            ></Route>
            <Route
              path="/admin/color"
              element={<ColorManage></ColorManage>}
            ></Route>
          </Route>
          <Route element={<AccountLayout></AccountLayout>}>
            <Route path="/user" element={<AccountInfo></AccountInfo>}></Route>
            <Route
              path="/user/address"
              element={<AccountAddress></AccountAddress>}
            ></Route>
            <Route
              path="/user/order"
              element={<AccountOrder></AccountOrder>}
            ></Route>
            <Route
              path="/user/feedback"
              element={<FeedbackManage></FeedbackManage>}
            ></Route>
            <Route
              path="/user/discount"
              element={<DiscountManage></DiscountManage>}
            ></Route>
            <Route
              path="/user/evaluate"
              element={<EvalueateManage></EvalueateManage>}
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
