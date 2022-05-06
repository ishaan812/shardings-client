import React from 'react'
import Home from './components/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import TextEditor from './components/TextEditor';
import Toolbar from './components/Toolbar';




function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/:id/:Username" element={<TextEditor />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
