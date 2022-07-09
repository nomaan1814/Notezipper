import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTRATION_REQUEST, USER_REGISTRATION_SUCCESS,USER_REGISTRATION_FAIL } from "../constants/userConst";
import axios from "axios";

export const login=(email,password)=>async(dispatch)=>{
    try {
        dispatch({type:USER_LOGIN_REQUEST})
        const config={
            headers:{
                "Content-type":"application/json"
            }
        }
        const {data}=await axios.post('/api/users/login',{email,password},config)
        dispatch({type:USER_LOGIN_SUCCESS,payload:data})
        localStorage.setItem("userdet",JSON.stringify(data))
    } catch (error) {
        dispatch({type:USER_LOGIN_FAIL,payload:error.response && error.response.data.message?error.response.data.message:error.message})
    }
}
export const logout=()=>async(dispatch)=>{
    localStorage.removeItem("userdet");
    dispatch({type:USER_LOGOUT})
}

export const register=(name,email,password,pic)=>async(dispatch)=>{
      try {
        dispatch({type:USER_REGISTRATION_REQUEST});
        const config={
            headers:{
            //   "Content-type":"application/json",
              "Content-type":"multipart/form-data"
            }
          }
          const formdata=new FormData();
          formdata.append('name',name);
          formdata.append('email',email);
          formdata.append('password',password);
          formdata.append('pic',pic);

          const {data}=await axios.post('/api/users/',formdata,config)
          dispatch({
            type:USER_REGISTRATION_SUCCESS,
            payload:data
          })

      } catch (error) {
        dispatch({type:USER_REGISTRATION_FAIL,payload:error.response && error.response.data.message?error.response.data.message:error.message})
      }
}