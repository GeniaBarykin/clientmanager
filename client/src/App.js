import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>          
          <Route path='*' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/registration' element={<Registration />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
