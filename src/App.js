import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import VisitorLog from "./VisitorLog";

function App() {
  return (
      <Router>
        <Routes>
            <Route exact path="/visitor-log" element={<VisitorLog/>} />
        </Routes>
      </Router>
  )
}

export default App;
