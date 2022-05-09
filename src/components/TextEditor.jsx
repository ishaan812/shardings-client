import React, { useState, useEffect, useRef} from 'react';
import { ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Navbar from './Navbar'
import {AiOutlineSend} from 'react-icons/ai';
import './TextEditor.css'
import draftToHtml from 'draftjs-to-html';
import {useParams} from 'react-router-dom';
import axios from 'axios'

const TextEditor = () => {
    let _contentState = ContentState.createFromText('');
    const raw = convertToRaw(_contentState);
    const [contentState, setContentState] = useState(raw);
    let {id,Username}=useParams();
    const [messages,Setmessages]=useState([]);

    useEffect(()=>{
      axios.get("http://localhost:5000/get/"+id)
      .then(res=>{
        Setmessages(res.data);
        console.log(messages);
      });
    },[])
    

    const SendMessage=async(e)=>{
      const markup=draftToHtml(contentState);
      console.log(markup);
      const messagebody={
        Username: Username.toString(),
        Message: markup,
        ID: id.toString(),
      }
      await axios.post("http://localhost:5000/send",messagebody)
      .then(res=>{
        console.log(res)
        console.log(messages);
      })
      await axios.get("http://localhost:5000/get/"+id)
        .then(res=>{
          Setmessages(res.data);
          console.log(messages);
        })
    }

    return (
      <div className="flex justify-between align-baseline flex-col ">
      <div className="min-h-screen bg-gradient-to-r from-sky-500 to-indigo-500">
        <div><Navbar/></div>
        <div className="h-70v overflow-scroll scrollbar-hide mt-5 backdrop-blur-0">

        {
            messages.map((message)=>
              {if(message["Username"]===Username){
              return(
                <div id="Recieve Message" className="rounded h-fit text-right text-white mt-10 mx-10 bg-black pr-10 py-10 mb-5">
                  <h2 className="font-bold">{message["Username"]}</h2>
                  <div dangerouslySetInnerHTML={{__html: message["Message"]}} />
                  <div className="text-xs"> {Date(message["Timestamp"])} </div>
                </div> 
              )}
              else
              {return(
                <div id="Send Message" className="colspan-6 rounded h-fit text-left pl-10 py-10 mx-10 bg-green-400 pr-10 mb-5">
                  <h2 className="font-bold">{message["Username"]}</h2>
                  <div dangerouslySetInnerHTML={{__html: message["Message"]}} />
                  <div className="text-xs"> {Date(message["Timestamp"])} </div>
                </div>
              )}}

            )
          }
        </div>
        <div className="absolute bottom-0  justify-evenly pl-5 pr-5 pt-5 flex-col bg-gradient-to-r from-sky-500 to-indigo-500">
        <Editor
          defaultContentState={contentState}
          onContentStateChange={setContentState}
          wrapperClassName="wrapper-class "
          toolbarClassName="toolbar-class"
          editorClassName="editor-class mt-4 border pb-2"
          placeholder="Enter message here"
          toolbar={{
            options: ['inline',  'list', 'blockType', 'emoji']
          }}
        />
        <button onClick={(e)=>{SendMessage(e)}} type="button" className="z-20 bottom-16 right-12 relative float-right text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 px-5 py-2">
          <AiOutlineSend/>
        </button>
        </div>
      </div>
      </div>
    )
}

export default TextEditor