import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Home from './pages/Home';
import Articles from './pages/Create_Articles';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import PrivateRoute from './pages/PrivateRoute';
import Logout from './pages/LogOut';
import ArticleDetail from './pages/ArticleDetail';

function App() {
  return (
  <div className='h-screen'>
      <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/articles" element={<PrivateRoute element={<Articles />} />} />
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path='/logout' element={<Logout/>}></Route>
        <Route path="/article/:id" element={<ArticleDetail />} />

      </Routes>
    </Router>
  </div>
  )
}


export default App
