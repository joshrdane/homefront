import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import VisitorLog from "./VisitorLog/VisitorLog";

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
