import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import MainScreen from '../../components/MainScreen';
import Row from 'react-bootstrap/esm/Row';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/esm/Col';
import './Login.css';
import { useState } from 'react';
import Loading from '../../components/Loading';
import Errormess from '../../components/Errormess';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userActions';

const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setpassword]=useState("");
    const dispatch=useDispatch();
    const userLogin=useSelector(state=>state.userLogin)
    const {loading,error,userDet}=userLogin;
    const navigate=useNavigate();
   useEffect(()=>{
     if(userDet){
          navigate("/mynotes")
     }
   },[navigate,userDet])
    const submithandler=async(e)=>{
        e.preventDefault();
        dispatch(login(email,password))
    }
  return (
    <MainScreen title='Login'>
    <div className="loginContainer">
        {error && <Errormess variant="danger">{error}</Errormess>}
     {loading && <Loading />}   
    <Form onSubmit={submithandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setpassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <Row className='py-3'>
         <Col>
            New Customer ? <Link to='/register'>Register Here</Link>
         </Col> 
    </Row>
    </div>
    </MainScreen>
   
  )
}

export default Login
