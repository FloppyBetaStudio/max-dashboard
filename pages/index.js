import {useEffect, useState} from "react";
import {Router} from "next/router";


export default function Home() {
  const [tokenExpire, setTokenExpire] = useState(0)
  const [isLogged, setIsLogged] = useState(false)
  useEffect(()=>{
    if(Math.floor(Date.now() / 1000) > localStorage.getItem("token_expire")){
      //未登录
      window.location.href="login"
    }else{
      //已登录
      window.location.href="dash"
    }

  }, [])
  return (
    <>

    </>
  )
}
