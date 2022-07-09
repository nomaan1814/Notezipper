import React from 'react'
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from"react-bootstrap/Card"
import notes from "../../data/Notes";
import Badge from 'react-bootstrap/Badge'
import { useEffect } from "react";
import { useState } from "react";

const deleteHandler=(id)=>{
    if(window.confirm('Are you sure to delete')){

    }
}
const Accordion = ({_id,title,category,content}) => {
    const [isActive,setActive]=useState(false)
  return (
    <Card onClick={()=>setActive(!isActive)}>
          <Card.Header style={{display:'flex'}}><span
          style={{
            color:'black',
            textDecoration:'none',
            flex:1,
            cursor:"pointer",
            alignSelf:"center",
            fontSize:18
          }}>{title}</span>
          <div>
            <Button><Link to={`note/${_id}`}>Edit</Link></Button>
            <Button variant='danger' className="mx-2" onClick={()=>deleteHandler(_id)}>Delete</Button>
          </div>
          </Card.Header>
          {isActive && 
          <Card.Body className='answer_wrapper'>
            <h4>
              <Badge bg="success">
                   Category - {category}
              </Badge>
            </h4>
        <blockquote className="blockquote mb-0">
          <p>
            {content}
          </p>
          <footer className="blockquote-footer">
            Created on 
          </footer>
        </blockquote>
      </Card.Body>
}
         
        </Card>
  )
}

export default Accordion
