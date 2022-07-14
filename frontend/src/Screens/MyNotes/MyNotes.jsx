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
import { listNotes } from "../../actions/notesAction";
import Loading from "../../components/Loading";
import Errormess from "../../components/Errormess";

const MyNotes = () => {
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
    useEffect(()=>{
        dispatch(listNotes());
        
        if(!userDet){
            navigate('/')
        }
    },[dispatch,navigate,userDet,successCreated,successUpdated])
  return (
   
    <MainScreen title={`Welcome Back ${userDet.name}..`}>
      {error && <Errormess>{error}</Errormess>}
      {loading && <Loading />}
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 8 }} size="lg">
          Create New Note
        </Button>
        </Link> 
        
        {
          notes?.reverse().map((note)=>(
              <Accordion key={note._id} {...note} />
          ))
        }
    </MainScreen>
  );
};

export default MyNotes;
