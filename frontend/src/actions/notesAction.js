import axios from "axios";
import { NOTES_CREATE_FAIL, NOTES_CREATE_REQUEST, NOTES_CREATE_SUCCESS, NOTES_LIST_FAIL, NOTES_LIST_REQUEST, NOTES_LIST_SUCCESS, NOTES_UPDATE_FAIL, NOTES_UPDATE_REQUEST, NOTES_UPDATE_SUCCESS } from "../constants/notesConstants";
export const listNotes=()=>async(dispatch,getState)=>{
     try {
        dispatch({
            type:NOTES_LIST_REQUEST
        });
        const {userLogin:{userDet}}=getState();
        const config={
            headers:{
                Authorization:`Bearer ${userDet.token}`
            }
        }
        const {data}=await axios.get('/api/notes',config);
        dispatch({
            type:NOTES_LIST_SUCCESS,
            payload:data
        })
     } catch (error) {
           const message=error.response && error.response.data.message ? error.response.data.message:error.message
           dispatch({
            type:NOTES_LIST_FAIL,
            payload:message
           })
     }
}
export const updateNotes=(id,title,content,category)=>async(dispatch,getState)=>{
     try {
        dispatch({
             type:NOTES_UPDATE_REQUEST
        })
        const {userLogin:{userDet}}=getState();
        const config={
                headers:{
                    "Content-type":"application/json",
                    Authorization:`Bearer ${userDet.token}`
                }
            }
        const {data}=await axios.put(`/api/notes/${id}`,{title,content,category},config);
        dispatch({
            type:NOTES_UPDATE_SUCCESS,
            payload:data
        })    
     } catch (error) {
        const message=error.response && error.response.data.message ? error.response.data.message:error.message
        dispatch({
         type:NOTES_UPDATE_FAIL,
         payload:message
        })
     }
}
export const createNotes=(title,content,category)=>async(dispatch,getState)=>{
    try {
       dispatch({
            type:NOTES_CREATE_REQUEST
       })
       const {userLogin:{userDet}}=getState();
       const config={
               headers:{
                   "Content-type":"application/json",
                   Authorization:`Bearer ${userDet.token}`
               }
           }
       const {data}=await axios.post('/api/notes/create',{title,content,category},config);
       dispatch({
           type:NOTES_CREATE_SUCCESS,
           payload:data
       })    
    } catch (error) {
       const message=error.response && error.response.data.message ? error.response.data.message:error.message
       dispatch({
        type:NOTES_CREATE_FAIL,
        payload:message
       })
    }
}