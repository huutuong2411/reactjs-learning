import { useState } from "react";
import Content from "./Content";


function App() {
  // const jsonlist = JSON.parse(localStorage.getItem('list'))
  // console.log(jsonlist)
  // const [todo, setTodo] = useState('')
  // const [list, setList] = useState(jsonlist ?? [])

  // const handleAdd = () => {
  //   if (todo === '') {
  //     alert('vui long nhap')
  //     return;
  //   }
  //   else {
  //     setList(prev => {
  //       const newList = [...prev, todo]
  //       const newJsonList = JSON.stringify(newList);

  //       localStorage.setItem('list', newJsonList);

  //       return newList
  //     });
  //     setTodo('')
  //   }
  // }
  const [show, setShow] = useState(false)
  return (
    <>
      {/* <div className="App" style={{ padding: 50 }}>
        <input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={() => handleAdd()}>Add</button>
        <ul>
          {list.map((list, index) => (
            <li key={index}>{list}</li>
          ))}
        </ul>
      </div> */}
      <button onClick={() => setShow(!show)}>Toogle</button>
      {show && <Content />}
    </>
  );

}

export default App;
