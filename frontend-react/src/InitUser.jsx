import React , {useEffect}from 'react'
import { userState  } from './store/user.js'
import { useRecoilState } from 'recoil';
import axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
const InitUser = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  useEffect(() => {
    async function init(){
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('https://ieee-hackathon-2024-codecrafters.onrender.com/api/user/me',{
            headers:{
              "Content-type" : "Application/json",
              'token' : token
            }
          });
          console.log(response.data);
          if(response.data.user)
          {
            setUser({ loggedIn: true, email: response.data.user.email, user_id : response.data.user_id,name: response.data.user.name , profileImgae:'' , saved:[] });

          }
          else{
            setUser({ loggedIn: false, email: '', user_id : -1,name:'' , profileImgae:'' , saved:[] });
          }
        } else {
        setUser({ loggedIn: false, email: '', user_id : -1,name:'' , profileImgae:'' , saved:[] });
        }
    }
    init();
  }, [setUser]);
  return (
    <div><Dashboard></Dashboard></div>
  )
}

export default InitUser;
