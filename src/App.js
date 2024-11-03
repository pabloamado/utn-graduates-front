import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link, Navigate} from 'react-router-dom';
import Searcher from './components/searcher/Searcher';
import EventManager from './components/eventManager/EventManager';
import RegisterLoader from './components/registerLoader/RegisterLoader';
import CsvLoader from './components/CsvLoader/CsvLoader';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li>
                            <Link to="/search">Buscador</Link>
                        </li>
                        <li>
                            <Link to="/events">Eventos</Link>
                        </li>
                        <li>
                            <Link to="/upload">Carga de Registros</Link>
                        </li>
                        <li>
                            <Link to="/upload-csv">Carga de CSV</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Navigate to="/search" />} />
                    <Route path="/search" element={<Searcher />} />
                    <Route path="/events" element={<EventManager />} />
                    <Route path="/upload" element={<RegisterLoader />} />
                    <Route path="/upload-csv" element={<CsvLoader />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;