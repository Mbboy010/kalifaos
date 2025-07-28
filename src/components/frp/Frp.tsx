"use client"


import FrpCon from './FrpCon';
import Loading from '../loading/Loading';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setLoad } from "../redux/slicer/Load"
import { setChat } from "../redux/slicer/CheckChat"

export default function Frp() {
  
  const [loading,setLoading] = useState<boolean>(false)
   const dispatch = useAppDispatch()
   
    useEffect(() => {
      dispatch(setChat(false))
        dispatch(setLoad(false))
         
         
    
      
      setTimeout(() =>{
        setLoading(true)
      },2000)
    },[])
      
  
  
  return (
    <div>
         {
      loading ?
      <div>

       <FrpCon />

      </div> :
        <Loading />


    }
    
    </div>
  )
}