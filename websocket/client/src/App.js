import './App.css';
import io from 'socket.io-client'
import {useEffect, useState} from 'react'
const socket = io.connect('http://localhost:5000');

function App() {
 const [msg,setMsg] = useState('')
 const [recMsg,setRecMsg] = useState('')
  function sendMsg(){
    socket.emit('send_message',{message: msg})
  }
  useEffect(()=>{
    socket.on('receive_message',(data)=>{
      setRecMsg(data.message)
    })
  })
  
  return (
    <div className='App'>
      <input onChange={(e)=>{setMsg(e.target.value)}} />
      <button onClick={sendMsg}>Send</button>
      <div>got: {recMsg}</div>
    </div>
  );
}

export default App;
