import {React,useContext} from 'react'
import {useAuth} from '../context/authcontext'
import { useNavigate } from 'react-router-dom'

function Home() {
   const {user,logout,loading}= useAuth()
   console.log(user)
   const navigate= useNavigate()
   const handlelogout =async()=>{
    try{
        await  logout()
    }catch(error){
        console.log(error)
    }
   
   }
   if (loading)return <h1>loading</h1>
  return (
    <div>
        <h1>welcome {user.displayname || user.email || user.phoneNumber
}</h1>
        <button onClick={handlelogout}>logout</button>
    </div>
  )
}
export default Home