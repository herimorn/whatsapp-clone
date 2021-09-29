import React, { useEffect,useState } from 'react'
import './Sidebar.css';
import {Avatar, IconButton} from "@material-ui/core"
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from '@material-ui/icons';
import Sidebarcharts from './Sidebarcharts'
import db from "./firebase";
import {useStateValue} from "./StateProvider"
function Sidebar() {
    const[rooms,setRooms]=useState([]);
    const[{user},dispatch]=useStateValue();
 
    useEffect(()=>{
       const unsubscribe= db.collection("rooms").onSnapshot((snapshot)=>
                setRooms(
                    snapshot.docs.map((doc)=>({
                        id:doc.id,
                        data:doc.data(),
                    }
                    ))
                )
             
             )
             return ()=>{
                unsubscribe(); 
             }
       
    } ,[])
    return (
        <div className="sidebar">
           <div className="sidebar__header">
          <Avatar src={user?.photoURL}/>
          <div className="sidebar__header__right">
              <IconButton>
              <DonutLargeIcon/>
              </IconButton>
              <IconButton>
              <ChatIcon/>
              </IconButton>
              <IconButton>
              <MoreVertIcon/>
              </IconButton>
            
          </div>
           </div>
           <div className="sidebar__search">
               <div className="sidebar__search__container">
            <SearchOutlined/>
            <input type="text" placeholder="search or start a new chart"/>
            </div>
           </div>
           <div className="sidebar__chart">
          <Sidebarcharts addNewChat/>
          {
              rooms.map((room)=>(
                  <Sidebarcharts key={room.id} id={room.id} name={room.data.name}/>
              ))
          }
        
           </div>
        </div>
    )
}

export default Sidebar
