import React,{useEffect,useState} from 'react'
import "./Sidebarchat.css"
import {Avatar} from "@material-ui/core";
import db from "./firebase";
import {Link} from "react-router-dom"
function Sidebarcharts({id,name,addNewChat}) {
    const[seed,setSeed]=useState('');
    const [messages,setMessages]=useState("")
    useEffect(()=>{
        if(id){
           db.collection("rooms").doc(id).collection("messages").
           onSnapshot((snapshot)=>
               setMessages(snapshot.docs.map((doc)=>doc.data()))
           );
        }
    },[])
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*500));
    },[id])
    const createChat=()=>{
       const roomName= prompt("please enter the name for a chat")
       if(roomName){
          
           //do some crazy staff from database here
           db.collection("rooms").add(
               {
                   name:roomName,
               }
           )
       }
    }
    return !addNewChat ?(
        <Link to={`/rooms/${id}`}>
            <div className="sidebarchat">
           <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
           <div className="sidebarchat__info">
               <h2>{name}</h2>
               <p>{messages[0]?.message}</p>
           </div>
        </div>   
        </Link>
        
    ):(
        <div onClick={createChat} className="sidebarchart">
         <h2>create new chart</h2>
        </div>
    );
}

export default Sidebarcharts
