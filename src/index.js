import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// tạo sự kiện fake comment
// function emitComment(id) {
//   setInterval(() => {
//     window.dispatchEvent(
//       new CustomEvent(`group-${id}`, {
//         detail: `Message of group ${id}`
//       })
//     )
//   }, 3000)
// }
// emitComment(1)
// emitComment(2)
// emitComment(3)


console.log(React);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <App />,

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
