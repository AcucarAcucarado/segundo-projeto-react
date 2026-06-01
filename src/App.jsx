// import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div className="text-center m-5">
      <h1 className="display-4 text-primary">Bem-Vindo!</h1>
      <p className="lead text-muted">
        Este é um projeto simples feito com React, Bootstrap, Router e
        LocalStorage.
      </p>
      <Link to="/Perfil" className="btn btn-primary btn-lg mt-3">Ir para Perfil</Link>
    </div>
  );
}

function Perfil() {
  return <></>;
}

export default function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand">ReactApp</span>
          <div className="navbar-nav">
            <Link className="nav-link text-white me-3" to="/">
              Home
            </Link>
            <Link className="nav-link text-white" to="/perfil">
              Perfil
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </div>
    </Router>
  );
}
