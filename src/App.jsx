import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./header.jsx";
import New from './threads/new.jsx';
import ThreadsList from './threadsList.jsx';
import ThreadPage from './threads/threadPage.jsx';
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
              <Route path="/threads/:thread_id" element={<ThreadPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App
