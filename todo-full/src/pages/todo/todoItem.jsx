import React, { useState } from "react";
import { Collapse } from "reactstrap";
import check from "../../assets/accept.png";
import editIc from "../../assets/edit.png";
import deleteIc from "../../assets/x-button.png";

const TodoItem = (props) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { info, handleEdit, handleDelete } = props;
  return (
    <div className="todo-item mb-2">
      <div className="action">
        <img
          src={deleteIc}
          width={25}
          alt=""
          className="me-2"
          onClick={() => handleDelete(info._id)}
        />
        <img src={editIc} width={30} alt="" onClick={() => handleEdit(info)} />
      </div>
      <div
        className="title"
        onClick={() => {
          setIsDetailOpen(!isDetailOpen);
        }}
      >
        <img src={check} alt="" width={25} />
        <div>{info.title}</div>
      </div>
      <Collapse isOpen={isDetailOpen}>
        <div>
          <hr />
          <div style={{ whiteSpace: "break-spaces" }}>{info.description}</div>
        </div>
      </Collapse>
    </div>
  );
};

export default TodoItem;
