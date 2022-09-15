import React, { useState } from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { getResponse } from "../../middleware/response";
import axios from "axios";

function EditBillboardModal(props) {
  const [owner] = useState(sessionStorage.getItem("userEmail"));
  const [_id] = useState(props._id);
  const [title, setTitle] = useState(props.title);
  const [type, setType] = useState(props.type);
  const [area, setArea] = useState(props.area);
  const [price, setPrice] = useState(props.price);
  const [description, setDescription] = useState(props.description);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      fetch(`https://billboardad.herokuapp.com/billboards/edit/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          type: type,
          area: area,
          price: price,
          description: description,
        }),
      }).then((res) => getResponse(res));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Billboard's Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="ModalContactForm.ControlInput1"
            >
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="billboard_tile"
                value={title}
                autoFocus
                required
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Form.Group>

            {/* <Form.Group
              className="mb-3"
              controlId="ModalContactForm.ControlInput1"
            >
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="billboardImg"
                accept="image/*"
                required
                onChange={onInputChange}
              />
            </Form.Group> */}

            <Form.Group className="mb-3" controlId="kindOfStand">
              <Form.Label>Type</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={type}
                required
                onChange={(e) => {
                    setType(e.target.value);
                }}
              >
                <option disabled>Type of the billboard</option>
                <option value="Traditional">Traditional</option>
                <option value="Digital">Digital</option>
              </Form.Select>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="ModalContactForm.ControlInput1"
            >
              <Form.Label>Area</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={area}
                required
                onChange={(e) => {
                    setArea(e.target.value);
                }}
              >
                <option disabled>Area in which the billboard is located</option>
                <option value="District 1">District 1</option>
                <option value="District 2">District 2</option>
                <option value="District 3">District 3</option>
              </Form.Select>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="ModalContactForm.ControlInput1"
            >
              <Form.Label>Price</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  value={price}
                  required
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
                <InputGroup.Text>VND</InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="ModalContactForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                required
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Form.Group>
            {/* <input type="submit"/> */}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditBillboardModal;
