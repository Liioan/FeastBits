import { Routes, Route } from 'react-router-dom';

//. components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

//. pages
import Home from './pages/Home/Home';
import About from './pages/About/About';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/diets' element={<>Diets</>} />
        <Route path='/meals' element={<>Meals</>} />
        <Route path='/blog' element={<>Blog</>} />
        <Route path='/contact' element={<>Contact</>} />
        <Route path='/account' element={<>Account</>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
