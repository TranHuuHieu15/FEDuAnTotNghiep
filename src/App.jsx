
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";
import Button from "./components/button/Button";
// import { Route, Routes } from 'react-router-dom'
import './App.css'
// import HomePage from './pages/HomePage'
// import LoginPage from './pages/LoginPage'
// import ContactPage from './pages/ContactPage'
import Button from './components/button/Button'
import googleIcon from "./assets/images/googleIcon.svg"
import Selectbox from './components/selectbox/Selectbox'

function App() {
  return (
    <>
      <Button></Button>
      <HomePage></HomePage>
      <Button className={"flex items-center gap-3 rounded-full m-2"} outline={"outlined"} color='blue-gray' src={googleIcon} size={"lg"} nameButton='Hieu dep trai siu cap pro'></Button>
      <Selectbox className={"flex w-72 flex-col gap-6"} nameSelect={"Problem?"} option={"Chưa web chưa đủ hiểu năng"} color={"blue"}></Selectbox>
      {/* <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/contact" element={<ContactPage></ContactPage>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      </Routes> */}
    </>
  );
}

export default App;
