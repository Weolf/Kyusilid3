import React, { useContext, useEffect, useState } from 'react'
import { responseContext } from '../Globalcontext'
import { SiAeromexico } from 'react-icons/si'
import axios from 'axios'


function Viewresponse() {

    const [score, setscore] = useState()
    const [uploadedFile, setUploadedFile] = useState('')
    const [ifsaved, setsaved] = useState(false)

    const {responseinfo} = useContext(responseContext)

    const tt = async ()=>{

        const temp = {
            "assign_id": responseinfo.assign_id,
            "score" : score,
         
        }
        console.log(JSON.stringify(temp))
        await  axios.post('https://api.kyusillid.online/api/setGrade' , temp).then(

        ()=>{
            alert("Successfully saved");
            setsaved(true)
        }
        ).catch()

    }

    useEffect(()=>{
        if(responseinfo !== undefined){
            setscore(responseinfo.grade)

        // Call the API endpoint to get the uploaded file for the student
        axios.get(`https://api.kyusillid.online/api/getfile/${responseinfo.assign_id}`)
        .then((response) => {
            setUploadedFile(response.data.url)
        })
        .catch((error) => {
            console.log(error)
        })
    }

},[responseinfo])
  return (
    <div>
        <div className="flex"> 
            <h4>Student's Work</h4>  
            <div className="flex marginleftauto">
                <h4>Score</h4>
                <input type="text" className="commontextbox primaryborder col-lg-4" defaultValue={score} onChange={(e)=>{setscore(e.target.value)}}/>
                {!ifsaved ?
                <button className='commontextbox secondary lighttext col-lg-4' onClick={tt}>Mark response</button>
            :
            <button className='commontextbox secondary lighttext col-lg-4' onClick={tt}>Saved </button>}
            </div>
        </div>
        <h4>{responseinfo.status}</h4>

        {/* Display the uploaded file if it exists */}
        {uploadedFile && <a href={uploadedFile} target="_blank">View Uploaded File</a>}
    </div>
  )
}

export default Viewresponse
