import {useEffect, useState} from "react";

function CoinTracker() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers?limit=5& quotes=USD,BTC,KRW")
            .then(response => response.json())
            .then(json => {
                setCoins(json);
                setLoading(false);
            });
    }, []);
    console.log(`coins loading...`, coins);
    return (
        <div className="guide_wrap">
            <div className="cryptocurrency">
                <h1>Cryptocurrency Converter</h1>
                <p>Please select the cryptocurrency to convert and enter the amount.</p>
                <div>
                    1. 2 종류의 input 생성 필요 - USD 입력할 수 있는 ① input 와 암호화폐로 변환되서 나올 ② input<br/>
                    2. 암호화폐 선택할수있는 select (map 사용)<br/>
                    3. ① 입력한 값이 실시간으로 ② 에서도 자동으로 변환되서 나올 수 있도록 노출<br/>
                    4. 가능하다면, 암호화폐 ↔ USD 버전도 만들 수 있도록 Invert 버튼도 추가해서 기능 추가
                </div>
            </div>
            <br/>

            <h1>the Coins! : ({coins.length})</h1>
            {loading ? <strong>Loading...</strong> : null}
            <ul>
                {coins.map((coin) => {
                    return <li key={coin.id}>{coin.name} ({coin.symbol}) - <small>{coin.quotes.USD.price} USD</small>
                    </li>;
                })}
            </ul>
        </div>
    );
}

/*const [index, setIndex] = useState(0);
    const [selectedSymbol, setSelectedSymbol] = useState("");
    const [amount, setAmount] = useState(0);
    const [selectArr, setSelectedArr] = useState([]);*/
/*const onSelect = (event) => {
        const idx = Number(event.target.value - 1);
        if(idx >= 0){
            setSelectedSymbol(coins[idx].symbol);
            setSelectedArr(coins[idx]);
        }else{
            setSelectedSymbol("");
        }
        setAmount(0);
    }
    const onChange = (event) => {
        setAmount(event.target.value * selectArr.quotes.USD.price);
        amount.toFixed(2)
    };*/
/*<select onChange={onSelect} value={index}>
    <option value={index}>Select your units</option>
    {coins.map((coin) => {
        return <option key={coin.id} value={coin.rank}>{coin.name} ({coin.symbol})</option>;
    })}
</select>
<div>
    <input type="number" onChange={onChange}/> USD → <input type="number" value={amount.toFixed(2)}
                                                            disabled/> {selectedSymbol !== "" ? selectedSymbol : null}
</div>*/

export default CoinTracker;