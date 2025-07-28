"use client"

import Loading from '../loading/Loading';
import ContactCon from './ContactCon';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setLoad } from "../redux/slicer/Load"
import { setChat } from "../redux/slicer/CheckChat"

export default function Contact() {
  
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

       <ContactCon  />

      </div> :
        <Loading />


    }
    
    </div>
  )
}