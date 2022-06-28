import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: 'http://localhost:3000',
  }
})

io.on('connection', socket =>{
  console.log(`user is connected: ${socket.id}`);
  
  socket.on('send_message',data=>{
    socket.broadcast.emit('receive_message', data)
  })
})

const PORT = process.env.PORT || 5000;
server.listen(PORT,()=>{
  console.log('server is running');
})


