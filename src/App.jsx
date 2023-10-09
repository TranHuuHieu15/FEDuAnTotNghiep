
// import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import ContactPage from "./pages/ContactPage";
import Button from "./components/button/Button";


function App() {
  return (
    <>
      <Button color="red">Button</Button>
      <HomePage></HomePage>
      {/* <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/contact" element={<ContactPage></ContactPage>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      </Routes> */}
    </>
  );
}

export default App;
