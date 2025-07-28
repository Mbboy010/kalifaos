"use client"


import BypassFrpSetting from './BypassFrpSetting';
import Loading from '../loading/Loading';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setLoad } from "../redux/slicer/Load"
import { setChat } from "../redux/slicer/CheckChat"


export default function Setting() {
  
  const [loading,setLoading] = useState<boolean>(false)
   const dispatch = useDispatch()
   
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
      <BypassFrpSetting />
      </div> :
        <Loading />
        
     
   }
    
    
    
    </div>
  )
}