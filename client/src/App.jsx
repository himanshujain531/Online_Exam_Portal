import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'

export default function App() {
  return(
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/admin-sign-in' element={<SignIn />} />

</Routes>
</BrowserRouter>
  )
}


