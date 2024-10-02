import React from 'react';
import logo from './logo.svg';
// React Routes to enable a bar to navigate between pages
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CoinTable from './components/CoinTable';
import CoinChart from './components/CoinChart';
import Trendings from './components/Trendings';
import MainLayout from './components/MainLayout';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<CoinTable />} />
          <Route path="/chart" element={<CoinChart />} />
          <Route path="/trendings" element={<Trendings />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
