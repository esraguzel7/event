import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Pages/home';
import HowItWorks from './Pages/howitworks';
import Login from './Pages/login';
import MyEvents from './Pages/myevents';
import Signup from './Pages/singup';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='how-it-works' element={<HowItWorks />} />

        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />

        <Route path='my-events' element={<MyEvents />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App;