import React from 'react'; // 리액트를 구현할 수 있는 플러그인을 연결
import ReactDOM from 'react-dom/client'; // HTML 랜더링 하기위한 플러그인 연결
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 외부 파일을 불러오는 것이므로, import 키워드 사용
// js 파일은 확장자를 붙이지 않음

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
