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
      axios.get("http://localhost:5000/get")
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
        Message: markup
      }
      await axios.post("http://localhost:5000/send",messagebody)
      .then(res=>{
        console.log(res)
        console.log(messages);
      })
      await axios.get("http://localhost:5000/get")
        .then(res=>{
          Setmessages(res.data);
          console.log(messages);
        })
    }



    return (
      <div className="App overflow-x-hidden min-h-screen z-10 bg-gradient-to-r from-sky-500 to-indigo-500">
        <Navbar/>
        <div className="h-70v overflow-x-scroll">
          {
            messages.map((message)=>
              {if(message["Username"]===Username){
              return(
                <div id="Recieve Message" className="rounded h-fit text-right bg-green-200 ml-96 pr-10 py-10 mb-5">
                <h2>{message["Username"]}</h2>
                <div dangerouslySetInnerHTML={{__html: message["Message"]}} />
                </div> 
              )}
              else
              {return(
                <div id="Send Message" className="rounded h-fit text-left pl-10 py-10 bg-red-200 mr-96 pr-10 mb-5">
                <h2>{message["Username"]}</h2>
                <div dangerouslySetInnerHTML={{__html: message["Message"]}} />
              </div>
              )}}

            )
          }
        </div>
        <div className="px-5 bg-gray-700 sticky bottom-0">
        <Editor
          defaultContentState={contentState}
          onContentStateChange={setContentState}
          wrapperClassName="wrapper-class sticky z-20"
          toolbarClassName="toolbar-class sticky"
          editorClassName="editor-class border border-gray-600 sticky"
          placeholder="Enter message here"
        />
        <button onClick={(e)=>{SendMessage(e)}} type="button" className="sticky bottom-14 3xl:bottom-24 right-12 float-right z-30 text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 px-5 py-2">
          <AiOutlineSend/>
        </button>
        </div>
      </div>
    )
}

export default TextEditor