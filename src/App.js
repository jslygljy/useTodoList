import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [lists,setTodos] = useState([
    {
      content:'学习vue',
      isCompleted:false
    },
    {
      content:'学习React',
      isCompleted:false
    },
    {
      content:'Build a todo app in React',
      isCompleted:true
    },
  ])
  function handleKeyDown(e,i){
    if(e.key === "Enter"){
      createTodoAtIndex(e,i)
    }
    if(e.key === 'Backspace' && lists[i].content === ''){
      e.preventDefault();
      removeTodoAtIndex(i)
    }
  }
  function createTodoAtIndex(e,i){
    const newTodos = [...lists];
    newTodos.splice(i+1,0,{
      content:'',
      isCompleted:false
    });
    setTodos(newTodos);
  }
  function updateTodoAtIndex(e,i){
    const newTodos = [...lists];
    newTodos[i].content = e.target.value;
    setTodos(newTodos);
  }
  function removeTodoAtIndex(i){
    if(i===0 && lists.length===1)return false;
    setTodos(lists.slice(i-1,i).concat(lists.splice(i+1,lists.length)));
    setTimeout(() => {
      document.forms[0].elements[i-1].focus();
    }, 0);
  }
  function toggleTodoCompleteAtIndex(i){
    const newTodos = [...lists];
    newTodos[i].isCompleted =!newTodos[i].isCompleted;
    setTodos(newTodos);
  }
  return (
    <div className="app">
      <div className="header">
        <img src={logo} className="logo" alt="logo" />
      </div>
      <form className="todo-list">
        <ul>
          {lists.map((todo, i) => (
            <div className={`todo ${todo.isCompleted && 'todo-is-completed'}`}>
              <div className={'checkbox'} onClick={() => toggleTodoCompleteAtIndex(i)}>
                {todo.isCompleted && (
                  <span>&#x2714;</span>
                )}
              </div>
              <input
                type="text"
                value={todo.content}
                onKeyDown={e => handleKeyDown(e, i)}
                onChange={e => updateTodoAtIndex(e, i)}
              />
            </div>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
