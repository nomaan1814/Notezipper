import './App.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import LandingPage from './Screens/Landingpage/LandingPage';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import MyNotes from './Screens/MyNotes/MyNotes';
import Register from './Screens/RegisterPage/Register';
import Login from './Screens/LoginPage/Login';
import CreateNote from './Screens/CreateNote';
import UpdateNote from './Screens/UpdateNote';
const App = () => {
  return (
    <BrowserRouter>
     <Header />
     <main style={{minHeight:"93vh"}}>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/mynotes' element={<MyNotes />} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/createnote' element={<CreateNote />} />
            <Route path='/note/:id' element={<UpdateNote />} />
          </Routes>
     </main>
     <Footer />
     </BrowserRouter>
  )
}

export default App;
