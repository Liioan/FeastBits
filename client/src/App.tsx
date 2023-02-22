import { Routes, Route } from 'react-router-dom';

//. components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

//. pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Meals from './pages/Meals/Meals';
import Diets from './pages/Diets/Diets';
import Blog from './pages/Blog/Blog';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/diets' element={<Diets />} />
        <Route path='/meals' element={<Meals />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/blog/:id' element={<div>XD</div>} />
        <Route path='/account' element={<>Account</>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
