import React from "react";
import MainScreen from "../../components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from"react-bootstrap/Card"
import notes from "../../data/Notes";
import Badge from 'react-bootstrap/Badge'
import { useEffect } from "react";
import { useState } from "react";
import Accordion from "./Accordion";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { deleteNotes, listNotes } from "../../actions/notesAction";
import Loading from "../../components/Loading";
import Errormess from "../../components/Errormess";

const MyNotes = ({search}) => {
  const dispatch=useDispatch();
  const noteList=useSelector(state=>state.noteList)
  const {loading,notes,error}=noteList;
  const userLogin=useSelector(state=>state.userLogin);
  const {userDet}=userLogin;
  const noteCreate=useSelector((state)=>state.noteCreate);
  const {success:successCreated}=noteCreate;
  const noteUpdate=useSelector((state)=>state.noteUpdate);
  const {success:successUpdated}=noteUpdate;
  const navigate=useNavigate();
//   const fetchNotes=async()=>{
//     const {data}=await axios.get('http://localhost:5000/api/notes');
//     setnotes(data)
// }
const noteDelete=useSelector(state=>state.noteDelete);
const {loading:deleteLoading,error:deleteError,success:deleteSuccess}=noteDelete;
const deleteHandler=(id)=>{
    if(window.confirm('Are you sure to delete')){
        dispatch(deleteNotes(id))
    }
}
    useEffect(()=>{
        dispatch(listNotes());
        
        if(!userDet){
            navigate('/')
        }
    },[dispatch,navigate,userDet,successCreated,successUpdated,deleteSuccess])
  return (
   
    <MainScreen title={`Welcome Back ${userDet.name}..`}>
      {deleteError && <Errormess>{deleteError}</Errormess>}
      {deleteLoading && <Loading />}
      {error && <Errormess>{error}</Errormess>}
      {loading && <Loading />}
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 8 }} size="lg">
          Create New Note
        </Button>
        </Link> 
        
        {
          notes?.reverse().filter((filteredNote)=>{
            return filteredNote.title.toLowerCase().includes(search.toLowerCase())
          }).map((note)=>(
              <Accordion key={note._id} {...note} deleteHandler={deleteHandler} />
          ))
        }
    </MainScreen>
  );
};

export default MyNotes;
