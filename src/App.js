import logo from './logo.svg';
import './App.css';
import { Button } from '@mui/material';
import { useState,useEffect } from 'react';
import Message from './components/Message';
import db from './firebase';
import { getFirestore, collection, addDoc,query,onSnapshot } from "firebase/firestore";

function App() {
  const [input, setInput] = useState('');
  //console.log(input);

  const [messages, setMessages] = useState([]);
  //console.log(messages);

  const [userName, setUserName] = useState('');

  useEffect(() => {
    setUserName(window.prompt("please enter your name"))
    //console.log("ok");
  }, [])// condition is empty , so run only when app component loads.   otherwise run ounce evertime condition is updated.
  

  useEffect(()=>{
    // db.collection("messages").orderBy("timestamp","desc").onSnapshot(snapshot =>{
    //   setMessanges(snapshot.docs.map(doc => ({id:doc.id, message: doc.data().message, userName: doc.data().userName})));
    // })
    //this is a listener it will add to our list when ever database changes
    const q = query(collection(db, "messages"));
    onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });
  },[])//only called ounce because db.collections is already a listneer, listneing ever time db changes




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
          //<h2>{userName}</h2>
          <Message username={userName} message={message}/>

        ))
      }
    </div>
  );
}

export default App;
