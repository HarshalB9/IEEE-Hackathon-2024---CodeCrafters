import React , {useEffect}from 'react'
import { userState  } from './store/user.js'
import { useRecoilState } from 'recoil';
import axios from "axios";
const InitUser = () => {
  const [user, setUser] = useRecoilState(userState);
  useEffect(() => {
    async function init(){
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:3000/api/user/login',{
            headers:{
              "Content-type" : "Application/json",
              'token' : token
            }
          });
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
    <div></div>
  )
}

export default InitUser;
