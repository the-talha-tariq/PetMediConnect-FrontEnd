import React,{useEffect} from 'react'
import axios from '../axiosInstance'

const Home = () => {
  const getUserData = async () =>{
    try {
       await axios.post('/api/v1/user/getUserData',{},{
        headers:{
          Authorization : "Bearer "+localStorage.getItem('token')
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getUserData();
  },[])
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  )
}

export default Home
