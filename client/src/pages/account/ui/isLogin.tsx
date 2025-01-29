'use client'

import { Authorizasion } from "@/widges/header/api/api";
import { useEffect } from "react";
import { redirectAction } from "../api/api";

const IsLogin = () => {
  useEffect(() => {
    async function  Login(){
      try{
        const AuthorizasionData = await Authorizasion()

      }catch(e:any){
        redirectAction('/')
        console.log(e.response.data.message)
      }
      // if(AuthorizasionData.status === 200 ) 
    }
    Login()
  }, []);
  
  
  return (
    <>
    </>
  )
};

export default IsLogin;
