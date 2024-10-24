// import Button from './Button';
// import styles from './App.module.css';
import {useState, useEffect} from "react";

function Hello(){
    /*useEffect(() => {
        console.log("created :)");
        // cleanup function
        return() => console.log("destroyed :(");
    }, []);*/
    useEffect(() => {
        console.log("hi :)");
        return () => console.log("bye :(");
    }, []);
    useEffect(function(){
        console.log("hi :)");
        return function (){
            console.log("bye :(")
        };
    }, []);
    return <h1>Hello</h1>
}

// Hello 와 같은걸 풀어쓴것
/*function HelloLong(){
    function byFn(){
        console.log("bye :(");
    }
    function hiFn (){
        console.log("hi :)");
        return byFn;
    }
    return <h1>Hi</h1>
}*/


function App() {
    const [counter, setValue] = useState(0);
    const [keyword, setKeyword] = useState("");
    const onClick = () => setValue((prev) => prev+1);
    const onChange = (event) => setKeyword(event.target.value);
    // console.log("i run all the time");
    // useEffect : 랜더링을 컨트롤 할수있는 기능, [] 가 비어있으면 1회만 실행하지만 [] 안에 명령어 기준으로 작동
    /*const iRunOnlyOnce = () => {
        console.log("CALL THE API....");
    };
    useEffect(iRunOnlyOnce, []);*/
    useEffect(() => {
        console.log("i run only once");
    }, []);
    useEffect(() => {
        /*if(keyword !== "" && keyword.length > 5){
            console.log("SEARCH FOR", keyword);
        }*/
        console.log("i run when 'keyword' changes.");
    }, [keyword]);
    useEffect(() => {
        console.log("i run when 'counter' changes.");
    }, [counter]);
    useEffect(() => {
        console.log("i run when keyword & counter changes.");
    }, [keyword, counter]);

    const [showing, setShowing] = useState(false);
    const onClickBtn = () => setShowing(prev => !prev);
    return (
        <div>
            <input type="text" placeholder="Serach here..." onChange={onChange} value={keyword}/>
            <h1>{counter}</h1>
            <button onClick={onClick}>click me</button>
            {/*<h1 className={styles.title}>Welcome back!!!</h1>
            <Button text={"Continue"} />*/}

            <hr/>
            {showing ? <Hello /> : null}
            {/*{showing ? <HelloLong /> : null}*/}
            <button onClick={onClickBtn}>{showing ? "Hide" : "Show"}</button>
        </div>
    );
}

export default App;
