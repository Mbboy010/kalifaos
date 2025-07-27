import TryCon from '../../components/Tryfree/TryCon';
import Loading from '../../components/loading/Loading';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'


import { setLoad } from "../../components/redux/slicer/Load"

import { setChat } from "../../components/redux/slicer/CheckChat"

export default function TryFree() {
  
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
          <title>Try free - Kalifa OS</title>
         {
      loading ?
      <div>

         <TryCon />

      </div> :
        <Loading />
      


    }
    </div>
  )
}