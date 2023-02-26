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
import BlogPost from './pages/BlogPost/BlogPost';
import OfferPage from './pages/OfferPage/OfferPage';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Account from './pages/Account/Account';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/diets' element={<Diets />} />
        <Route path='/meals' element={<Meals />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/blog/:id' element={<BlogPost />} />
        <Route path='/offer/:id' element={<OfferPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/account' element={<Account />} />
        <Route path='/change-password' element={<>change password</>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
