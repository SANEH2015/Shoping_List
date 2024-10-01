

import {Link} from "react-router-dom"
import React, { useState, useEffect } from 'react';
import Image from '../assets/shop-removebg-preview.png'
 function Home() {
  const [backgroundColor, setBackgroundColor] = useState('');
  useEffect(() => {
    const randomColor = ["#AED1FF", "#E8FFFF","#FFDFF7","#A2FFE9"]
    const randomIndex = Math.floor(Math.random() * randomColor.length)
    setBackgroundColor(randomColor[randomIndex]);
  }, []);

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor,height:"100vh",width:"100%"}}>
      <div>
      <p>-FREE 30 DAYS TRIAL</p>
      <h1 style={{fontSize:"80px",fontWeight:"bold"}}>The best way<br></br>to shop<br></br>your needs</h1>
 
     <Link to={'Login'}><button style={{backgroundColor:"rgb(4, 52, 80)",color:"white",padding:"20px",borderRadius:"10px",margin:"10px"}}>Login</button></Link> 
      <Link to={'/Register'}><button style={{padding:"20px",borderRadius:"10px",margin:"10px",backgroundColor:"transparent"}}>Register</button></Link>
      </div>
      
      <div>
 <img src={Image}></img>
      </div>

    </div>
  )
}
export default Home