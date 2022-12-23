import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import SearchBar from './features/search-bar/SearchBar';
import Map from './features/map/Map';

function App() {
  <head>
    <title>Hello</title>
  </head>
  return (
    <div className="App bg-slate-900">
      <header className="App-header">
        <h1 className='text-gray-50 mb-10 text-right'>By Semion & Ron</h1>
        <h1 className='text-gray-50 mb-10'>כמה עולה הנכס?</h1>
        <SearchBar />
        <Map/>
        <h1 className='text-white mt-5'>עולה לי</h1>
        <Counter/>
      </header>
    </div>
  );
}

export default App;
