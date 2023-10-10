
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";
// import { Route, Routes } from 'react-router-dom'
import './App.css'
// import HomePage from './pages/HomePage'
// import LoginPage from './pages/LoginPage'
// import ContactPage from './pages/ContactPage'
import Button from './components/button/Button'
import Input from './components/input/Input'
import Radio from './components/radiobutton/Radio'
import Footer from "./components/footer/footer";

function App() {
  return (
    <div>
      <Button>
        <img src="" alt="" />
      </Button>
      <Radio color="red" label="hiep" name="type"></Radio>
      <Radio color="red" label="dhf" name="type"></Radio>


      <Input type="password" className="w-[500px] m-2" size='lg' color="red" label="Fullname"></Input>
      <Footer></Footer>
    </div>

  );
}

export default App;
