import { useState } from "react";
import logo from './logo.svg';
import './App.css';

import Btn from './Btn';

function App() {
  const [value, setValue] = useState("Save changes");
  const changeValue = () => setValue("Revert Changes");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <Btn text={value} fontSize={18} changeVal={changeValue} />
        <Btn text="Continue" />
      </header>
    </div>
  );
}

export default App;
