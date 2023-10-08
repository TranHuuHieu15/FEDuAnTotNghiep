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
      <Button className={"flex items-center gap-3 rounded-full m-2"} outline={"outlined"} color='blue-gray' src={googleIcon} size={"lg"} nameButton='Hieu dep trai siu cap pro'></Button>
      {/* <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/contact" element={<ContactPage></ContactPage>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      </Routes> */}
    </>
  )
}

export default App
