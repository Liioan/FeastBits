import { Routes, Route } from 'react-router-dom';

//. pages
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<>About</>} />
        <Route path='/diets' element={<>Diets</>} />
        <Route path='/meals' element={<>Meals</>} />
        <Route path='/blog' element={<>Blog</>} />
        <Route path='/contact' element={<>Contact</>} />
        <Route path='/account' element={<>Account</>} />
      </Routes>
    </div>
  );
}

export default App;
