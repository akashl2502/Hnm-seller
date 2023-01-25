import React from 'react'
import Tilt from "react-parallax-tilt";
import "../Signinpage/Glassmorphism.css";
const Signup = () => {
  return (
    <div className='Background'>
<div className=" h-screen w-screen relative overflow-hidden flex justify-center items-center">
        <div className="h-40-r w-40-r bg-gradient-to-r from-green-400 to-blue-500 rounded-full absolute left-2/3 -top-56 transform rotate-160 animate-pulse"></div>
        <div className="h-35-r w-35-r bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full absolute top-96 -left-20 transform rotate-180 animate-pulse"></div>
        <Tilt>
          <div class="w-96 shadow-2xl shadow-slate-900 mx-auto text-white bg-clip-padding backdrop-filter bg-white bg-opacity-10 backdrop-blur-md mt-20 py-10 px-8 rounded-md relative bottom-7">
            <div class="text-center text-2xl">Register</div>
            <form class="mt-6">
            <div class="mb-4">
                <label for="email">Name</label>
                <input
                  id="email"
                  type="email"
                  class="bg-white  bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full"
                />
              </div>
              <div class="mb-4">
                <label for="email">Email</label>
                <input
                  id="email"
                  type="email"
                  class="bg-white  bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full"
                />
              </div>
              <div class="mb-4">
                <label for="password">Password</label>
                <input
                  id="password"
                  type="password"
                  class="bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full"
                />
              </div>
              <div class="mb-4">
                <label for="password">Company Name</label>
                <input
                  id="password"
                  type="password"
                  class="bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full"
                />
              </div>
              <div class="form-check">
      <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-teal-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault"/>
      <label class="form-check-label font-poppins text-sm inline-block text-white" for="flexCheckDefault">
     Agree Terms Of Service And Privacy Poilcy
      </label>
    </div>
              <div class="flex place-content-evenly">
                <button class="mt-0 text-primary font-poppins bg-blue-gradient bg-opacity-30 hover:bg-opacity-40 transition duration-500 rounded-md shadow-md shadow-slate-600/70 p-3 w-full font-semibold relative top-8 ">
                  Sign Up
                </button>
              </div>
            </form>
            <div class="text-center pt-4 text-sm"></div>
          </div>
        </Tilt>
      </div>
      </div>
  )
}

export default Signup