import { HashRouter, BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Detail from './routes/Detail';
import './App.css';

function App() {
    return (
        // ex) BrowserRouter : http://localhost:3000/movie HashRouter : http://localhost:3000/#/movie
        // path 뒤에 넘겨주는 값이 궁금하다면, :xxxx 로 넘겨주면 useParams 로 받을수 있다
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<Detail />} />
                <Route path="/hello" element={<h1>hello</h1>} />
            </Routes>
        </BrowserRouter>

        /*<HashRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie" element={<Detail />} />
            </Routes>
        </HashRouter>*/
    );
}

export default App;