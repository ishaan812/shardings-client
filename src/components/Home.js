import React,{useState} from 'react'
import Navbar from './Navbar'
import { useHistory } from "react-router-dom";

function Home() {
    const [Username,SetUsername]=useState("");
    const [Group,SetGroup]=useState("");
    

    const verify=(e)=>{
        e.preventDefault();
        window.location.href = "http://www.localhost:3000/"+Group+"/"+Username;  
    }


  return (
    <div>
        <Navbar/>
        <div className="grid place-items-center h-screen">
            <form className="w-full max-w-sm">
                <div className="flex flex-col items-center border-b border-teal-500 py-2 my-10">
                    <input value={Username} onChange={e=>SetUsername(e.target.value)} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Username" name="fname"/>
                </div>
                <div className="flex flex-col items-center border-b border-teal-500 py-2 my-10">
                    <input value={Group} onChange={e=>SetGroup(e.target.value)} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Group ID" />
                </div>
                <button type="button" onClick={e=>{verify(e)}} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full">Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Home