// import { Route, Routes } from 'react-router-dom'
import './App.css'
// import HomePage from './pages/HomePage'
// import LoginPage from './pages/LoginPage'
// import ContactPage from './pages/ContactPage'
import Button from './components/button/Button'
import googleIcon from "./assets/images/googleIcon.svg"

function App() {

  return (
    <>
      <Button className={"flex items-center gap-3 rounded-full"} outline={"outlined"} color='blue-gray'>
        <img src={googleIcon} alt="" className={"w-6 h-6"} />
        Hieu dep trai siu cap pro
      </Button>
      <Button color='red' outline={""}>Hiếu Trần</Button>
      {/* <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/contact" element={<ContactPage></ContactPage>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      </Routes> */}
    </>
  )
}

export default App
