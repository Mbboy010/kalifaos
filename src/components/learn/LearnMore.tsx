"use client"

import LearnMorePage from './LearnMorePage';
import Loading from '../../components/loading/Loading';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setLoad } from "../../components/redux/slicer/Load"
import { setChat } from "../../components/redux/slicer/CheckChat"

export default function LearnMore() {
  
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
      
        <title>Learn more</title>
         {
      loading ?
      <div>

      <LearnMorePage />

      </div> :
        <Loading />


    }
    
    </div>
  )
}