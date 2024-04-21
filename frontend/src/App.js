import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import MainPage from './containers/MainPage/MainPage';
import BookPage from './containers/BookPage/BookPage';
import AddPage from './containers/AddPage/AddPage';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" exact element={<MainPage />} />
      <Route path="/book/new" exact element={<AddPage />} />
      <Route path="/book/:id" element={<BookPage />} />
    </Routes>
  </Router>
    
  );
}

export default App;
