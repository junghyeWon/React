import UseGuide from './UseGuide';
import ToDos from './ToDos';
import CoinTracker from './CoinTracker';

import './App.css';

function App() {
    return (
        <div>
            <UseGuide/>
            <hr/>

            <ToDos/>
            <hr/>

            <CoinTracker />
            <hr/>
        </div>
    );
}

export default App;
