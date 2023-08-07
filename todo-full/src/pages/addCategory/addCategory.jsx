import React, { useState } from "react";
import "./addCategory.css";
import plus from "../../assets/plus.png";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const AddCategory = (props) => {
  const [title, setTitle] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const toggle = () => {
    setTitle("");
    setModalOpen(!modalOpen);
  };
  return (
    <>
      <div className="add-category hover" onClick={toggle}>
        <img src={plus} alt="" width={50} />
      </div>
      <Modal isOpen={modalOpen} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>Add category</ModalHeader>
        <ModalBody>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              props.handleAddCategory(title);
              toggle();
            }}
          >
            Save
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddCategory;
