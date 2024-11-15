import "./App.css";
import Navbar from "./components/Navbar";
import Create from "./components/Create";
import Update from "./components/Update";
import Read from "./components/Read";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DeletedRecords from "./components/deletedRecords";
//https://github.com/NomanGhayyur/MERN-APP.git
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/userlist" element={<Read />} />
          <Route exact path="/update/:id" element={<Update />} />
          <Route exact path="/deletedRecords" element={<DeletedRecords />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
