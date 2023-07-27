import React from 'react';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className='header'>
        <input type='text' placeholder='type your task here'/>
        <button>add</button>
      </div>
      <div className='todoList'>

      </div>
    </div>
  );
}

export default App;
