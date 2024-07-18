

import axios from "axios";

export default async function handleButtonOnClick(photo_id , loggedIn ,token){
    console.log("handle button clicked");
    if(!loggedIn)
    {
        window.location.href = "/login";
    }
    console.log(photo_id);
    console.log(token);
    const response = await axios.post("http://localhost:3000/api/photo/saveAPhoto",{
       
    },{
        headers:{
            "Content-Type":"application/json",
            "token" : token,
            photo_id : photo_id
        }
    });
    console.log(response.data)
    if(response.data.saved)
    {
        alert("photo saved")
    }
    
}