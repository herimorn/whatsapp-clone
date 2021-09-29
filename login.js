import React from 'react'
import "./login.css";
import {Button} from "@material-ui/core";
import {auth,provider}from "./firebase";
import { actionTypes } from './reducer';
import {useStateValue} from "./StateProvider"
//play with google authentication
function Login() {
    const[{},dispatch]=useStateValue()
    const signIn=()=>{
      auth.signInWithPopup(provider).then((result)=>{
          dispatch({
              type:actionTypes.SET_user,
              user:result.user,
          })
      }).catch((error)=>alert(error.message));
     
    }
    return (
        <div className="login">
            <div className="login__container">
                <img  className="login__image"src="https://scontent.fdar10-1.fna.fbcdn.net/v/t1.6435-9/c0.23.206.206a/p206x206/107021371_162719801976490_8867690071427940533_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=da31f3&_nc_ohc=eDYK9qxjOloAX-oXFcp&_nc_ht=scontent.fdar10-1.fna&oh=b90996a14c43e7d252367de94ef72906&oe=6172B633"/>
            </div>
            <div className="login__text">
                <h1>sign in to watsaap</h1>
            </div>
            <Button style={{background:"green",marginTop:'50px',textTransform:'inherit',color:'white'}} onClick={signIn}>sign in with google</Button>
        </div>
    )
}

export default Login
