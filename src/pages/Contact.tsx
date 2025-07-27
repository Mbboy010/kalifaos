import ContactCon from '../components/contact/ContactCon';
import AboutCon from '../components/about/AboutCon';
import PolicyCon from '../components/policy/PolicyCon';
import Loading from '../components/loading/Loading';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setLoad } from "../components/redux/slicer/Load"
import { setChat } from "../components/redux/slicer/CheckChat"

export default function Contact() {
  
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
            <title>Contact - Kalifa OS</title>
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