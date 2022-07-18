import React, { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import MainScreen from "../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { update } from "../actions/userActions";
import Errormess from "../components/Errormess";
import Loading from "../components/Loading";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setmessage] = useState(null);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userDet } = userLogin;
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;
  var profilePic = "/api/users/img/" + pic;
  const [uploadedFile,setUploadFile]=useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userDet) {
      
      navigate("/");
    } else {
      setName(userDet.name);
      setEmail(userDet.email);
      setPic(userDet.pic);
    }
  }, [navigate, userDet,success,userLogin]);
  const postDetails = (pics) => {
       setUploadFile(pics);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setmessage("Password do not match");
    } else {
      dispatch(update({name, email, password, uploadedFile}));
    }
  };
  return (
    <MainScreen title="My Profile">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {message && <Errormess variant="danger">{message}</Errormess>}
              {error && <Errormess variant="danger">{error}</Errormess>}
              {success && (
                <Errormess variant="success">Updated Successfully</Errormess>
              )}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="pic">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  label="Upload profile picture"
                  onChange={(e) => postDetails(e.target.files[0])}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            md={6}
          >
            <img src={profilePic} alt="" width="300" height="300" />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;
