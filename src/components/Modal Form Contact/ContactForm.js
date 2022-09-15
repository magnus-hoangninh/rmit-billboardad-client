import React, { useEffect, useState } from 'react';
import {Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import { getResponse } from "../../middleware/response";
import './ContactForm.css';
import axios from "axios";

function ModalContact(props) {
  const [users, setUsers] = useState([]);
  const [senderEmail] = useState(sessionStorage.getItem("userEmail"));
  const [billboardOwnerEmail] = useState(props.billboardOwnerEmail);
  const [billboardID] = useState(props.billboardID);
  const [contactPhone, setContactPhone] = useState(null);
  const [message, setMessage] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      fetch("https://billboardad.herokuapp.com/messages/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderEmail: senderEmail,
          billboardOwnerEmail: billboardOwnerEmail,
          billboardID: billboardID,
          contactPhone: contactPhone,
          message: message
        }),
      }).then((res) => getResponse(res));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{
    axios.get('https://billboardad.herokuapp.com/users/')
    .then(res => {setUsers(res.data)})
    {users.map(user=>(user.email == sessionStorage.getItem("userEmail") ? setContactPhone(user.phone) : null))}
  }, [users])

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Contact
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="ModalContactForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder={senderEmail}
                autoFocus
                required
                disabled
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="ModalContactForm.ControlInput1">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder={contactPhone}
                required
                disabled
                />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="ModalContactForm.ControlTextarea1"
            >
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} required
                onChange={(e) => {
                  setMessage(e.target.value);
                }}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalContact;