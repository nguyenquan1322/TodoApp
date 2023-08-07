import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import plus from "../../assets/plus.png";
const FormSave = (props) => {
  const [isShowForm, setIsShowForm] = useState(false);

  const { addTodo, selectedTodo, handleChange, clearVal, updateTodo } = props;

  useEffect(() => {
    if (selectedTodo.id) {
      setIsShowForm(true);
    }
  }, [selectedTodo]);
  const toggle = () => {
    clearVal();
    setIsShowForm(!isShowForm);
  };

  const handleSave = async () => {
    if (selectedTodo.id) {
      await updateTodo();
    } else {
      await addTodo();
    }
    toggle();
  };

  return (
    <>
      <div className="text-center add-button hover">
        <img src={plus} alt="" width={50} onClick={toggle} />
      </div>
      <div className={`form-save ${isShowForm ? "show" : ""}`}>
        <input
          type={"text"}
          name={"title"}
          className="form-control mb-3"
          value={selectedTodo.title}
          onChange={handleChange}
        />
        <textarea
          onChange={handleChange}
          className="form-control mb-3 flex-grow-1"
          name="description"
          value={selectedTodo.description}
        ></textarea>
        <div className="d-flex" style={{ gap: 15 }}>
          <Button className="flex-grow-1" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button className="flex-grow-1" onClick={toggle}>
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
};

export default FormSave;
