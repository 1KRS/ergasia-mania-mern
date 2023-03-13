import Landing from './pages/Landing';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<div>Dashboard</div>}></Route>
        <Route path='/landing' element={<Landing />}></Route>
        <Route path='/register' element={<div>Register</div>}></Route>
        <Route path='/error' element={<h1>Error</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
