import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './Components/Header'
import Main from './Components/Main'
import {Route, Routes} from 'react-router-dom'
import './App.css'
import Nav from './Components/Nav'

function App() {
  return (
    <div>
            <Main />
    </div>
  );
}

export default App;
