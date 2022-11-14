import { useState, useEffect } from 'react'
import axios from 'axios'
export function Index() {
  const url = "http://localhost:3000";
  const [showCreation, setShowCreation] = useState(false);
  const [showFeed, setShowFeed] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");  
  const [json, setJson] = useState([]);

  useEffect(() => {
    const request = async () => {
    const requestOptions = {
      headers:  { 'Content-Type':'application/json'}
    }
    const res = await axios.get(`${url}/feed`,requestOptions)
    setJson(res.data);
  }
  request();
  
  }, [])
  
  const createComp = () => {
    const handleSubmit = async (e) => {
      e.preventDefault();
      const obj = {
        "title":title,
        "content":content
      }
      const requestOptions = {
        headers:  { 'Content-Type':'application/json'}
      }
      const res = await axios.post(`${url}/create`, obj, requestOptions);
      setShowCreation(false);
    }
    return (
      <>
        <div>
          Title:<textarea value={title} cols="30" rows="1" onChange={(e) => setTitle(e.target.value)}></textarea>
        </div>
        <div>
          Content:
        </div>
          <textarea value={content} cols="30" rows="10" onChange={(e) => setContent(e.target.value)}></textarea>
        <button onClick={(e) => handleSubmit(e)}>Submit</button>
      </>
    )
  }
  const feedComp = () => {

    return (
      <> 
      Blog Feed: <hr/>
      <div>
        {json.map((obj,index) => {
          return (
          <div> 
            <div>
            {obj.title}
            </div>
            <div>
            {obj.content}
            </div>
            <hr/>
          </div>
        )})}
      </div>
      </>
    )
  }
  const handleCreation = (e) => {
    e.preventDefault();
    setShowFeed(false);
    setShowCreation(true);
  }
  const handleFeed = async (e) => {
    e.preventDefault();
    setShowCreation(false);
    setShowFeed(true)

  }

  return (<div>
    <button onClick={(e) => handleCreation(e)}>Create</button><br/>
    <button onClick= {(e) => handleFeed(e)}>Show Blog</button><br/>
    {showCreation ? createComp(): ""}
    {showFeed ? feedComp() : ""}
  </div>);
}
