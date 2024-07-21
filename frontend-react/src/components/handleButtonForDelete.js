

import axios from "axios";

export default async function handleButtonOnClickDelete(photo_id , loggedIn ,token){
    console.log("handle button clicked");
    if(!loggedIn)
    {
        // window.location.href = "/login";
        alert("please login first")
    }
    console.log(photo_id);
    console.log(token);
    const response = await axios.post("https://ieee-hackathon-2024-codecrafters.onrender.com/api/photo/deleteAPhoto",{
       
    },{
        headers:{
            "Content-Type":"application/json",
            "token" : token,
            photo_id : photo_id
        }
    });
    console.log(response.data)
    if(response.data.deleted)
    {
        alert("photo deleted")
    }
    else{
        alert("problem")
    }
}