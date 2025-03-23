import logo from './logo.svg';
import './App.css';
//import { IconButton } from '@mui/material';
import { useState } from 'react';


function App() {
  const [input, setInput] = useState('');
  console.log(input);

  const [messages, setMessages] = useState(["hello", "hi", "whats up"]);
  console.log(messages);


  const sendMessage = (event) => {
    setMessages([...messages,input]);
    setInput('');
  }
  return (
    <div className="App">
      <h1> Messanger app</h1>

      {/*input field */}
      <input value={input} onChange={event => setInput(event.target.value)}/>

      {/* button to send message */}
      <button onClick={sendMessage}> send message</button>

      {/* list of messages*/}

      {
        messages.map(message =>(
          <p>{message}</p>
        ))
      }
    </div>
  );
}

export default App;
