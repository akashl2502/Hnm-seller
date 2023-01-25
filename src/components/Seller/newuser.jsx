import React from 'react'
import bg from "../../assets/bbblurry.svg"
import "./seller.css"
const Newuser = () => {
  return (
<div className='user'>
    <div class="container">
    <div class="design">
        <div class="pill-1 rotate-45"></div>
        <div class="pill-2 rotate-45"></div>
        <div class="pill-3 rotate-45"></div>
        <div class="pill-4 rotate-45"></div>
    </div>
    <div class="login">
     
        <h3 class="title">Update Your Account</h3>
      <div className='media'>
        <div className='w-full flex gap-10 mt-10'>
          <div className='w-full'>
          <label>Name</label>
        <div class="text-input">
            <i class="ri-user-fill"></i>
            <input type="text" placeholder="Name"/>
        </div>
          </div>
          <div className='w-full'>
          <label>Company Name</label>
        <div class="text-input">
            <i class="ri-user-fill"></i>
            <input type="text" placeholder="Company Name"/>
        </div>
          </div>
          
        
        </div>
        <div className='w-full flex gap-10 mt-5'>
          <div className='w-full'>
          <label>Email Id</label>
        <div class="text-input">
            <i class="ri-user-fill"></i>
            <input type="text" placeholder="Email Id"/>
        </div>
          </div>
          <div className='w-full'>
          <label>Mobile No</label>
        <div class="text-input">
            <i class="ri-user-fill"></i>
            <input type="text" placeholder="Mobile No"/>
        </div>
          </div>
          
        
        </div>
        
       
        </div>
        <div className='w-half mt-5 px-10 mr-10 ml-[-2rem]'>
          <label>GST No</label>
        <div class="text-input1">
            <i class="ri-user-fill"></i>
            <input type="text" placeholder="GST"/>
        </div>
          </div>

        <button class="login-btn">Update</button>
        
    </div>
</div>
</div>
  
  )
}

export default Newuser
