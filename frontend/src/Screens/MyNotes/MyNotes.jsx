import React from "react";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from"react-bootstrap/Card"
import notes from "../../data/Notes";
import Badge from 'react-bootstrap/Badge'
import { useEffect } from "react";
import { useState } from "react";
import Accordion from "./Accordion";
import axios from 'axios';

const MyNotes = () => {
  const [notes,setnotes]=useState([])
  const fetchNotes=async()=>{
    const {data}=await axios.get('http://localhost:5000/api/notes');
    setnotes(data)
}
    useEffect(()=>{
        fetchNotes()
    },[])
  return (
   
    <MainScreen title="Welcome Back">
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 8 }} size="lg">
          Create New Note
        </Button>
        </Link> 
        {
          notes.map((note)=>(
              <Accordion key={note._id} {...note} />
          ))
        }
    </MainScreen>
  );
};

export default MyNotes;
