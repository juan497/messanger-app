import logo from './logo.svg';
import './App.css';
import { Button,FormControl,Input,IconButton } from '@mui/material';
import { useState,useEffect } from 'react';
import Message from './components/Message';
import db from './firebase';
import { getFirestore, collection, addDoc,query,onSnapshot,serverTimestamp, orderBy  } from "firebase/firestore";


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
    const q = query(collection(db, "messages"), orderBy("timestamp","desc"));
    onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({id : doc.id , data: doc.data()})));
    });
  },[])//only called ounce because db.collections is already a listneer, listneing ever time db changes




  const sendMessage = (event) => {
    //event.preventDefault();
    event.preventDefault();
    
    const collectionRef = collection(db, 'messages');
    addDoc(collectionRef, {      
      text: input,
      username: userName,
      timestamp: serverTimestamp()
    });

    setInput('');
  }
  return (
    <div className="App">
      <h1> Messanger app </h1>
      <h2> welcome {userName}</h2>

      <form className="app__form">
        <FormControl className= "app__formControl">
          <Input className= "app__input" placeholder="Enter a message..." value={input} onChange={event => setInput(event.target.value)} />

          <IconButton className="app__iconButton" disabled={!input} type="submit" onClick={sendMessage} color="primary">
              {/* <SendIcon/> */}
              send
          </IconButton>

        </FormControl>
      </form>


      {
        messages.map(message =>(
          //<h2>{userName}</h2>
          <Message key={message.id} username={userName} message={message.data}/>

        ))
      }
    </div>
  );
}

export default App;
