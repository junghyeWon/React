import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './routes/Home';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path={`${process.env.PUBLIC_URL}/`} element={<Home />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
