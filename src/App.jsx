import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Header from "./header.jsx";
import ThreadsList from './threadsList.jsx';
import New from './threads/new.jsx';
import './App.css';

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
              <Route path="/threads/new" element={<New />} />
              <Route path="/" element={<ThreadsList />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App
