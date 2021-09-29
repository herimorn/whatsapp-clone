import {React,useState,useEffect} from 'react'
import "./Chat.css"
import{Avatar,IconButton} from '@material-ui/core'
import {SearchOutlined,MoreVert,AttachFile} from '@material-ui/icons'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import { useParams } from 'react-router'
import db from './firebase'
import {useStateValue} from "./StateProvider"
import firebase from "./firebase"





function Chat() {
    const[input,setInput]=useState("");
    const[seed,setSeed]=useState('');
    const{ roomId }= useParams();
    const[roomName,setRoomName]=useState("");
    const[messages,setMessages]=useState([])
    const[{user},dispatch]=useStateValue();
    useEffect(()=>{
        if(roomId){
            db.collection("rooms").doc(roomId).onSnapshot((snapshot)=>
                setRoomName(snapshot.data().name))
                db.collection("rooms").doc(roomId).collection("messages").
                onSnapshot((snapshot)=>
                    setMessages(snapshot.docs.map((doc)=>doc.data()))
                );
                
           
        }
    },[roomId])
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*500));
    },[])
    const sendMessage=(e)=>{
         e.preventDefault();
     
         console.log("you typed",input)
         db.collection("rooms").doc(roomId).collection('messages').add({
            message:input,
            name:user.displayName,
            timestamp:Date(),
        }

        )
         setInput("")
    }
  
    return (
        <div className="chat">
         <div className="chat__header" >
         <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
           <div className="chat__header__info">
               <h3>{roomName}</h3>
               <p>last seen{Date()}</p>
           </div>
           <div className="chat__header__right">
           <IconButton>
              <SearchOutlined/>
              </IconButton>
              <IconButton>
              <AttachFile/>
              </IconButton>
              <IconButton>
              <MoreVert/>
              </IconButton>
           </div>
         </div>
         <div className="chat__body" >
             {
                 messages.map((message)=>(
                    <p className={`chat__message ${message.name===user.displayName &&'chat__receiver'}`}>
                    <span className="chart__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp"> 
                           
                            {
                        
                           
                            new Date(message.timestamp).toUTCString()
                            }
                            

                        </span>
                       </p>
                  ))
             }
             
         </div>
         <div className="chat__footer" >
             <InsertEmoticonIcon/>
             <form>
                 <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} placeholder="type the message"/>
                 <button type="submit" onClick={sendMessage}>send a message</button>
             </form>
             <MicIcon/>
         </div>
        </div>
    )
}

export default Chat
