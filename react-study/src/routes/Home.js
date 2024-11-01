import UseGuide from "../components/UseGuide";
import ToDos from "../components/ToDos";
import CoinTracker from "../components/CoinTracker";
import Movies from "../components/Movies";
import ReactRouter from "../ReactRouter";
import './Home.css';

function Home(){
    return (
        <div>
            <UseGuide />
            <hr/>

            <ToDos />
            <hr/>

            <CoinTracker />
            <hr/>

            <Movies />
            <hr/>

            <ReactRouter />
            <hr/>
        </div>
    );
}

export default Home;