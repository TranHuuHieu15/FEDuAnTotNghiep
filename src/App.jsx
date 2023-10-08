// import { Route, Routes } from 'react-router-dom'
import './App.css'
// import HomePage from './pages/HomePage'
// import LoginPage from './pages/LoginPage'
// import ContactPage from './pages/ContactPage'
import Button from './components/button/Button'
import googleIcon from "./assets/images/googleIcon.svg"
import Input from './components/input/Input'
import Radio from './components/radiobutton/Radio'

function App() {

  return (
    <>
      <Button className="flex items-center gap-3 rounded-full m-2" outline="outlined" color='blue-gray' src={googleIcon} size={"lg"} nameButton='Hieu dep trai siu cap pro'></Button>
      <Input className="" color="red" outline="outlined"></Input>
      <div>
        <Radio className="flex gap-10"
          name="type"
          variant="outlined"
          color="yellow"
          label="React">
        </Radio>
        <Radio className="flex gap-10"
          name="type"
          variant="outlined"
          color="red"
          label="Html">
        </Radio>
      </div>
      {/* <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/contact" element={<ContactPage></ContactPage>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      </Routes> */}
    </>
  )
}

export default App
