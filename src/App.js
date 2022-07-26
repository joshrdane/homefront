import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import VisitorLog from "./VisitorLog/VisitorLog";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route exact path="/visitor-log" element={<VisitorLog/>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App;
