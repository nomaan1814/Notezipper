import React from 'react'
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from"react-bootstrap/Card"
import notes from "../../data/Notes";
import Badge from 'react-bootstrap/Badge'
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from 'react-redux';


const Accordion = ({_id,title,category,content,createdAt,deleteHandler}) => {
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
            <Button><Link to={`/note/${_id}`}>Edit</Link></Button>
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
            Created on{" "} 
            <cite title='Source Title'>
                {createdAt.substring(0,10)}
            </cite>
          </footer>
        </blockquote>
      </Card.Body>
}
         
        </Card>
  )
}

export default Accordion
