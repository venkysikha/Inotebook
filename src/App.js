
import './App.css';
import
{
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom"

import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import Contact from './components/Contact';
import { useState } from 'react';

function App() {
  const [alert,setAlert]=useState(null);
  const showAlert=(message,type)=>
  {
    setAlert({msg:message,type:type})
    setTimeout(()=>
    {
      setAlert(null)
    },1500);
  }
  return (
    <>
    <NoteState>
    <Router>
    <Navbar/>
    <Alert alert={alert}/>
      <div className='container my-3'>
      <Routes>
      <Route  path="/" element={<Home  showAlert={showAlert}/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/login" element={<Login showAlert={showAlert}/>}/>
      <Route path="/signup" element={<Signup showAlert={showAlert}/>}/>
      <Route path="/contact" element={<Contact/>}/>
      </Routes>
      </div>
    </Router> 
    </NoteState>
    </>
  );
}

export default App;
