import React from 'react'
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row';
import './Landingpage.css';
import {Link, useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

const LandingPage = () => {
//   const navigate=useNavigate();
//   useEffect(()=>{
//     const user=localStorage.getItem("userdet")
//     if(user){
//         navigate('/mynotes');
//     }
// },[navigate])
  return (
    <div className='main'>
        <Container>
            <Row>
                <div className='intro-text'>
                     <div>
                        <h1 className='title'>Welcome to Note Zipper</h1>
                         <p className='subtitle'>One safe place for all your notes</p>
                     </div>
                     <div className="buttonContainer">
                        <Link to="/login">
                            <Button size='lg' className='landingbutton'>Login</Button>
                        </Link>
                        <Link to="/register">
                            <Button size='lg' className='landingbutton' variant='outline-primary'>Signup</Button>
                        </Link>
                     </div>
                </div>
            </Row>
      </Container>
    </div>
  )
}

export default LandingPage
