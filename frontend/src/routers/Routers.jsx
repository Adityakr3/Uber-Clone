import React from 'react'
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import LoadingPage from '../pages/LoadingPage';
import UserLogin from '../pages/user/UserLogin';
import UserRegister from '../pages/user/UserRegister';
const Routers = () => {
  return (
    <BrowserRouter>
    <Routes>
       <Route path="/" element={<LoadingPage />} />
       <Route path="/login" element={<UserLogin/>} />
        <Route path="/usersignUp" element={<UserRegister/>} />
    </Routes>
 </BrowserRouter>
  )
}

export default Routers
