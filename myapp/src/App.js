import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Pages/home';
import HowItWorks from './Pages/howitworks';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='how-it-works' element={<HowItWorks />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App;