import {useEffect, useState} from "react";

function CoinTracker() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [amount, setAmount] = useState(0);
    const [selectedCoin, setSelectedCoin] = useState(0);
    const [inverted, setInverted] = useState(false);
    const [selectedUnits, setSelectedUnits] = useState(false);
    const reset = () => setAmount(0);
    const selectCoin = (event) => {
        if(event.target.options.selectedIndex === 0){
            setAmount(0);
            setSelectedUnits(false);
        }else{
            setSelectedCoin(event.target.value);
            setSelectedUnits(true);
        }
    };
    const converter = (event) => setAmount(event.target.value);
    const onInvert = () => {
        reset();
        setInverted((current) => !current);
    };
    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers?limit=3& quotes=USD,BTC,KRW")
            .then((response) => response.json())
            .then(json => {
                setCoins(json);
                //setSelectedCoin의 초기값이 0인 경우 금액입력을 해도 결과가 NaN이 되버림 (첫 코인의 가격을 넣어두기)
                setSelectedCoin(1);
                setLoading(false);
            });
    }, []);
    // console.log(`coins loading...`, coins);

    return (
        <div className="guide_wrap">
            <div className="cryptocurrency">
                <h1>Cryptocurrency Converter</h1>
                <p>Please select the cryptocurrency to convert and enter the amount.</p>
                <div>
                    <select onChange={selectCoin}>
                        <option key="xx" value="0">Select your units</option>
                        {coins.map((coin) => <option key={coin.id} value={coin.quotes.USD.price}>{coin.name} ({coin.symbol})</option>)}
                    </select>
                    <div>
                        <label htmlFor="myUsd">Your USD</label>
                        <input id="myUsd" type="number" value={inverted ? (selectedCoin * amount).toFixed(2) : amount} onChange={converter} disabled={inverted || !selectedUnits} />
                        <label htmlFor="btc">What coins can you get?</label>
                        <input id="btc" type="number" value={inverted ? amount : (amount / selectedCoin).toFixed(2)} onChange={converter} disabled={!inverted} />
                        <span>
                            <button onClick={onInvert}>Invert</button>
                            <button onClick={reset}>Reset</button>
                        </span>
                    </div>
                </div>
            </div>
            <br/>

            <div>
                <h1>the Coins! : ({coins.length})</h1>
                {loading ? (
                    <strong>Loading...</strong>
                ) : (
                    <ul>
                        {coins.map((coin) => {
                            return <li key={coin.id}>{coin.name} ({coin.symbol}) - <small>{coin.quotes.USD.price} USD</small></li>;
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default CoinTracker;