import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./App.css";

function Home(temaSalvo) {
  /*Titulo Tela de Inicio*/
  const dateString = new Date().toLocaleDateString();
  const [clima, setClima] = useState(null);
  const [loadingClima, setLoadingClima] = useState(true);

  const [indiceFrases, setIndiceFrases] = useState(0);
  const frases = [
    "O fracasso não existe. É apenas uma mudança de direção - Alejandro Jodorowsky.",
    "Transforme suas feridas em sabedoria - Oprah Winfrey.",
    "Não deixe que o medo de perder seja maior do que a emoção de ganhar - Robert Kiyosaki.",
    "Todo progresso ocorre fora da zona de conforto - Michael John Bobak.",
    "Tente não se tornar um homem de sucesso. Em vez disso, torne-se um homem de valor - Albert Einstein."];

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceFrases((previIndice) => (previIndice + 1) % frases.length);
    }, 10000); //5000ms = 10seg
    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    const buscarClima = async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=-23.5505&longitude=-46.6333&current_weather=true",
        );
        const data = await res.json();
        setClima(data.current_weather);
      } catch (error) {
        console.error("Erro ao buscar clima", error);
      } finally {
        setLoadingClima(false);
      }
    };
    buscarClima();
  }, []);

  return (
    <div className="container my-5">
      <div className="p-1 mb-1 bg-light rounded-3 shadow-sm border">
        <div className="container-fluid py-1 text-center">
          <h1 className="display-5 fw-bold text-primary">Bem-Vindo!</h1>
          <p className="col-md-8 fs-4 mx-auto text-muted">
            Este é um projeto simples feito com React, Bootstrap, Router e
            LocalStorage.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <Link to="/Perfil" className="btn btn-primary btn-lg mt-3">
              <i className="bi bi-person-circle me-2"></i>Perfil
            </Link>
            <Link
              to="/config"
              className="btn btn-outline-secondary btn-lg px-4 shadow-sm"
            >
              <i className="bi bi-gear-fill me-2"></i>Configurações
            </Link>
          </div>
        </div>
      </div>

      <div className="row g-4 mt-2">
        <div className="col-md-6">
          <div className="card h-100 shadow-sm border-0 bg-primary text-white">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title mb-1">Clima Agora</h5>
                  <p className="card-text small opacity-75">
                    São Paulo, BR {dateString}
                  </p>
                </div>
                <i className="bi bi-cloud-sun fs-1"></i>
              </div>
              <div className="mt-3">
                {loadingClima ? (
                  <div
                    className="spinner-border spinner-border-sm text-light"
                    role="status"
                  ></div>
                ) : clima ? (
                  <div className="d-flex align-items-baseline">
                    <h2 className="display-4 fw-bold mb-0">
                      {clima.temperature}ºC
                    </h2>
                    <span className="ms-3 fs-5">
                      Vento: {clima.windspeed} km/h
                    </span>
                  </div>
                ) : (
                  <p>Não foi possível carregar o clima.</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="rounded border h-100 shadow-sm border-0 bg-dark text-white">
            <div className="card-body p-4">
              <h5 className="card-title mb-3">Dicas de Hoje</h5>
              <p className=" ">{frases[indiceFrases]}</p>
              <Link to="/config" className="btn btn-sm btn-outline-light mt-2">
                Mudar Tema
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Perfil({ temaSalvo }) {
  const [foto, setFoto] = useState(() => {
    return localStorage.getItem("fotoPerfil") || "";
  });

  useEffect(() => {
    localStorage.setItem("fotoPerfil", foto);
  }, [foto]);

  const removerFoto = () => {
    setFoto("");
  };

  const imgChange = (event) => {
    const arquivo = event.target.files[0];

    if (arquivo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoto(reader.result);
      };
      reader.readAsDataURL(arquivo);
    }
  };

  return (
    //Cartão Principal
    <div className="card shadow mx-auto my-5" style={{ maxWidth: "400px" }}>
      {/*Cabeçalho*/}
      <div className={`card-header text-white text-center py-3 ${temaSalvo}`}>
        {/*Titulo do Perfil*/}
        <h3 className="m-0">Meu Perfil</h3>
      </div>
      {/*Corpo do Cartão*/}
      <div className="card-body text-center d-flex flex-column align-items-center">
        {foto ? (
          <img
            src={foto}
            alt="Foto de Perfil"
            className="img-thumbnail rounded-circle mb-3"
            style={{ width: "322px", height: "322px", objectFit: "cover" }}
          />
        ) : (
          <div
            className="bg-light rounded-circle border d-flex align-items-center justify-content-center mb-3 text-muted"
            style={{ width: "200px", height: "200px", fontSize: "14px" }}
          >
            Sem foto de perfil
          </div>
        )}
      </div>
      {/*Imagem*/}
      <div className="mb-3 w-100">
        <label
          htmlFor="inputFoto"
          className="form-label text-start w-100 fw-bold"
        >
          Escolha uma foto:
        </label>
        <input
          type="file"
          id="inputFoto"
          accept="image/*"
          className="form-control"
          onChange={imgChange}
        />

        {/*Botão que remove/exclui a foto*/}
        {foto && (
          <button
            className="btn btn-outline-danger btn-sm w-100 mb-3"
            onClick={removerFoto}
          >
            Remover Foto
          </button>
        )}

        <hr className="w-100" />

        {/*Volta para Casa/Home*/}
        <Link to="/" className="btn btn-secondary w-100">
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}

function Config({ temaSalvo, setTemaSalvo, setTemaPreview }) {
  const [temaSelecionado, setTemaSelecionado] = useState(temaSalvo);

  const mudarPreview = (novoTema) => {
    setTemaSelecionado(novoTema);
    setTemaPreview(novoTema);
  };

  const salvarTema = () => {
    setTemaSalvo(temaSelecionado);
    toast.success("Tema foi salvo com sucesso!");
  };

  return (
    <div className="card">
      <div className="mx-auto my-5" style={{ maxWidth: "400px" }}>
        <div className={`card-header ${temaSelecionado}`}>
          <h1 className="p-2 ">Configuração</h1>
        </div>
        <hr />
        <h3>Temas</h3>
        <button
          type="button"
          className="btn btn-primary btn-lg m-2"
          onClick={() => mudarPreview("bg-primary")}
        >
          Azul
        </button>
        <button
          type="button"
          className="btn btn-warning btn-lg m-2"
          onClick={() => mudarPreview("bg-warning")}
        >
          Amarelo
        </button>
        <button
          type="button"
          className="btn btn-danger btn-lg m-2"
          onClick={() => mudarPreview("bg-danger")}
        >
          Vermelho
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-lg m-2"
          onClick={() => mudarPreview("bg-secondary")}
        >
          Cinza
        </button>
        <button
          type="button"
          className="btn btn-dark btn-lg m-2"
          onClick={() => mudarPreview("bg-dark")}
        >
          Preto
        </button>
        <button
          type="button"
          className="btn btn-success btn-lg m-2"
          onClick={() => mudarPreview("bg-success")}
        >
          Verde
          </button>
        <button
          type="button"
          className="btn btn-petroleo btn-lg m-2"
          style={{backgroundColor: '#0F4C5C', color: 'white', border: 'none'}}
          onClick={() => mudarPreview(" bg-petroleo ")}
        >
          Azul Petróleo
        </button>
        <button
          type="button"
          className="btn btn-info btn-lg m-2"
          onClick={() => mudarPreview("bg-info")}
        >
          Azul claro
        </button>
        <p></p>
        <button
          className="btn btn-outline-success btn-lg mt-5 w-100"
          onClick={salvarTema}
        >
          Salvar
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [temaSalvo, setTemaSalvo] = useState(() => {
    return localStorage.getItem("temaNavbar") || "bg-dark";
  });

  const [temaPreview, setTemaPreview] = useState(temaSalvo);

  useEffect(() => {
    localStorage.setItem("temaNavbar", temaSalvo);
    setTemaPreview(temaSalvo);
  }, [temaSalvo]);

  return (
    <Router>
      <nav className={`navbar navbar-expand navbar-dark ${temaPreview}`}>
        <div className="container">
          <span className="navbar-brand">ReactApp</span>
          <div className="navbar-nav">
            <Link
              className="nav-link text-white me-3"
              to="/"
              onClick={() => setTemaPreview(temaSalvo)}
            >
              Home
            </Link>
            <Link
              className="nav-link text-white me-3"
              to="/perfil"
              onClick={() => setTemaPreview(temaSalvo)}
            >
              Perfil
            </Link>
            <Link className="nav-link text-white" to="/config">
              <i className="bi bi-gear"></i>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home temaSalvo={temaSalvo} />} />
          <Route path="/perfil" element={<Perfil temaSalvo={temaSalvo} />} />
          <Route
            path="/config"
            element={
              <Config
                temaSalvo={temaSalvo}
                setTemaSalvo={setTemaSalvo}
                setTemaPreview={setTemaPreview}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
