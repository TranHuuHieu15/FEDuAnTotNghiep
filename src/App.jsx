import { Route, Routes } from "react-router-dom";
import "./App.css";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/contact" element={<ContactPage></ContactPage>}></Route>
        <Route path="/login" element={<SignInPage></SignInPage>}></Route>
        <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
      </Routes>
    </>
  );
}

export default App;
