import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/home/home';
import Scrumboard from './components/scrumboard/Scrumboard';
import SignIn from './components/sign-in/sign-in';
import SignUp from './components/sign-up/sign-up';

class App extends React.Component {
  render() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/scrumboard' element={<Scrumboard />} />
      </Routes>
    </BrowserRouter>
  );
  }
}

export default App;
