import React, { useEffect, useState } from "react";
import Loading from "../../components/loading";
import ApiService from "../../service/apiService";
import FormSave from "./formSave";
import TodoItem from "./todoItem";

const TodoCategory = (props) => {
  const { info } = props;
  const [todoItem, setTodoItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({
    id: null,
    title: "",
    description: "",
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    setSelectedTodo({ ...selectedTodo, [name]: value });
  };
  const clearVal = () => {
    setSelectedTodo({ id: null, title: "", description: "" });
  };
  const loadTodo = async () => {
    try {
      setLoading(true);
      const todoRes = await ApiService.getTodoByCategory(info._id);
      if (todoRes.data.success) {
        setTodoItem(todoRes.data.Todos);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadTodo();
  }, []);

  const addTodo = async () => {
    try {
      setLoading(true);
      const addResponse = await ApiService.addTodoForCategory({
        title: selectedTodo.title,
        description: selectedTodo.description,
        category: info._id,
      });
      if (addResponse.data.success) {
        await loadTodo();
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const updateTodo = async () => {
    try {
      setLoading(true);
      const addResponse = await ApiService.updateTodo(
        {
          title: selectedTodo.title,
          description: selectedTodo.description,
        },
        selectedTodo.id
      );
      if (addResponse.data.success) {
        await loadTodo();
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (todo) => {
    setSelectedTodo({
      id: todo._id,
      title: todo.title,
      description: todo.description,
    });
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const addResponse = await ApiService.deleteTodo(id);
      if (addResponse.data.success) {
        await loadTodo();
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="todo-category-item">
      {loading && <Loading absolute />}
      <div className="text-center fw-bold fs-3 mb-2">{info.title}</div>
      <div className="list-todo-container">
        {todoItem.map((item) => (
          <TodoItem
            key={item._id}
            info={item}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <FormSave
        addTodo={addTodo}
        updateTodo={updateTodo}
        selectedTodo={selectedTodo}
        handleChange={handleChange}
        clearVal={clearVal}
      />
    </div>
  );
};

export default TodoCategory;
