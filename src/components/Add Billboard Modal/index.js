import React, { useState } from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { getResponse } from "../../middleware/response";
import axios from "axios";
import './index.css';

function ModalContact() {
  const [owner] = useState(sessionStorage.getItem("userEmail"));
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Traditional");
  const [area, setArea] = useState("District 1");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const handleChangeType = (e) => {
    setType(e.target.value);
  };
  const handleChangeArea = (e) => {
    setArea(e.target.value);
  };
  const onInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      fetch("https://billboardad.herokuapp.com/billboards/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          owner: owner,
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
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("billboardImg", file);
    formData.append("owner", owner);
    formData.append("title", title);
    formData.append("type", type);
    formData.append("area", area);
    formData.append("price", price);
    formData.append("description", description);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    await axios
      .post("https://billboardad.herokuapp.com/billboards/", formData, config)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data);
      });
  };

  return (
    <>
      <Button className="btn-cus" variant="primary" onClick={handleShow}>
        Add New
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Your Billboard</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onFormSubmit}>
            <Form.Group
              className="mb-3"
              controlId="ModalContactForm.ControlInput1"
            >
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="billboard_tile"
                placeholder="Ex: Billboard at Turtle Lake, HCM"
                autoFocus
                required
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group
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
            </Form.Group>

            <Form.Group className="mb-3" controlId="kindOfStand">
              <Form.Label>Type</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={type}
                required
                onChange={handleChangeType}
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
                onChange={handleChangeArea}
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
                  placeholder="Price for renting per year"
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
          <Button variant="primary" onClick={onFormSubmit}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalContact;
