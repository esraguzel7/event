import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Pages/home';
import HowItWorks from './Pages/howitworks';
import Login from './Pages/login';
import SingUp from './Pages/singup';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='how-it-works' element={<HowItWorks />} />

        <Route path='login' element={<Login />} />
        <Route path='singup' element={<SingUp />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App;