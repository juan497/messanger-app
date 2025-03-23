import logo from './logo.svg';
import './App.css';
import { Button } from '@mui/material';
import { useState,useEffect } from 'react';
import Message from './components/Message';


function App() {
  const [input, setInput] = useState('');
  //console.log(input);

  const [messages, setMessages] = useState([
    {username: "Bob", text: "hello"},
    {username: "lilyth", text: "whats up"}
  ]);
  //console.log(messages);

  const [userName, setUserName] = useState('');

  useEffect(() => {
    setUserName(window.prompt("please enter your name"))
    //console.log("ok");
  }, [])// condition is empty , so run only when app component loads.   otherwise run ounce evertime condition is updated.
  


  const sendMessage = (event) => {
    //event.preventDefault();
    setMessages([...messages,{username: userName, text: input}]);
    setInput('');
  }
  return (
    <div className="App">
      <h1> Messanger app </h1>
      <h2> welcome {userName}</h2>

      {/*input field */}
      <input value={input} onChange={event => setInput(event.target.value)}/>

      {/* button to send message */}
      {/*look up button in material ui to know the atributes. https://mui.com/material-ui/react-button/ */}
      <Button variant = "outlined" color = "primary" onClick={sendMessage}> send message</Button>

      {/* list of messages*/}

      {
        messages.map(message =>(
          //<h2>{message}</h2>
          <Message username={message.username} text={message.text}/>
        ))
      }
    </div>
  );
}

export default App;
