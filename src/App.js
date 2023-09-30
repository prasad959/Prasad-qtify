import React from "react"
import './App.css';
import { Route,Routes } from "react-router-dom"
import LandingPage from "./mainpages/LandingPage";
import AlbumsDetails from "./mainpages/AlbumsDetails/AlbumsDetails";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/album/:slug" element={<AlbumsDetails />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    
    </div>
  );
}

export default App;
