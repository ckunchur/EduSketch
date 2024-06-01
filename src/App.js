import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import NavBar from './components/NavBar.jsx';
import UploadFile from './components/UploadFile.jsx';
import ChooseStyle from './components/ChooseStyle.jsx';
import TextEntry from './components/TextEntry.jsx';
import GridView from './components/GridView.jsx';
import SlideView from './components/SlideView.jsx';

function App() {
  return (
    <div className="App">
      <Router>
      <NavBar></NavBar>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/file" element={<UploadFile />} />
          <Route exact path="/text" element={<TextEntry />} />

          <Route exact path="/style" element={<ChooseStyle />} />
          <Route exact path="/grid" element={<GridView />} />
          <Route exact path="/slide" element={<SlideView />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
