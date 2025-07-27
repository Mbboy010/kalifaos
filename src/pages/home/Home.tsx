import GoogleAd from '../../components/google/GoogleAd';

import HomeCon from '../../components/home/HomeCon'; 
import Loading from '../../components/loading/Loading';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'


import { setLoad } from "../../components/redux/slicer/Load"

import { setChat } from "../../components/redux/slicer/CheckChat"


export default function Home() {
  
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
      <title>Kalifa OS</title>
         {
      loading ?
      <div>
      
      
      <GoogleAd 
        data-ad-client="ca-pub-9241182560906060"
        data-ad-slot="4594927499"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      
      
    <HomeCon />

      </div> :
        <Loading />


    }

    </div>
  )
}