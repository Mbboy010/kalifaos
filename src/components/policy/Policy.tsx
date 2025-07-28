"use client"

import PolicyCon from './PolicyCon';
import Loading from '../loading/Loading';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setLoad } from "../redux/slicer/Load"
import { setChat } from "../redux/slicer/CheckChat"

export default function Policy() {
  
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

       <PolicyCon />

      </div> :
        <Loading />


    }
    
    </div>
  )
}