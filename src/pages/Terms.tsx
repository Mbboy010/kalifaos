import TermsCon from '../components/terms/TermsCon';
import Loading from '../components/loading/Loading';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setLoad } from "../components/redux/slicer/Load"
import { setChat } from "../components/redux/slicer/CheckChat"


export default function Terms() {
  
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
    
            <title>Terms of service - Kalifa OS</title>
         {
      loading ?
      <div>

      <TermsCon />

      </div> :
        <Loading />


    }
    
    
    
    </div>
  )
}