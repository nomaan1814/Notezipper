
import React from 'react'
import MainScreen from '../components/MainScreen'
import Card from 'react-bootstrap/Card';
import { useEffect,useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { updateNotes } from '../actions/notesAction';
import Errormess from '../components/Errormess';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import Loading from '../components/Loading';
import axios from 'axios';



const UpdateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date,setDate]=useState("")

  const dispatch = useDispatch();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;
  const navigate=useNavigate();
  const param=useParams();
  const userLogin=useSelector((state)=>state.userLogin);
  const {userDet}=userLogin;
//   console.log(note);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;
    dispatch(updateNotes(param.id,title, content, category));
    resetHandler();
    navigate("/mynotes");
  };

  useEffect(() => {
    const fetching = async () => {
        const config={
            headers:{
                Authorization:`Bearer ${userDet.token}`
            }
        }
      const { data } = await axios.get(`/api/notes/${param.id}`,config);
      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [param.id, date]);
  return (
    <MainScreen title="Edit Note">
      <Card>
        <Card.Header>Edit your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <Errormess variant="danger">{error}</Errormess>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading &&  <Loading size={50} />}
            <Button type="submit" variant="primary" className='my-2'>
              Update Note
            </Button>
            <Button type="submit" variant="danger" className='my-2 mx-2'>
              Delete Note
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  )
}



export default UpdateNote
