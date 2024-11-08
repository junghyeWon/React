import UseGuide from "../components/UseGuide";
import ToDos from "../components/ToDos";
import CoinTracker from "../components/CoinTracker";
import Movies from "../components/Movies";

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
        </div>
    );
}

export default Home;