import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Loading from "../../components/loading";
import { authState } from "../../redux/slice/authSlice";
import ApiService from "../../service/apiService";
import AddCategory from "../addCategory/addCategory";
import Nav from "../nav/nav";
import "./todo.css";
import TodoCategory from "./todoCategory";
const Todo = () => {
  const [categories, setCategories] = useState([]);
  const loginStatus = useSelector((state) => state.authSlice.status);
  const [loading, setLoading] = useState(false);
  const loadCategory = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getCategory();
      if (response.data.success) {
        setCategories(response.data.categorys);
      }
      console.log(response);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadCategory();
  }, []);

  const handleAddCategory = async (title) => {
    try {
      setLoading(true);
      const response = await ApiService.addCategory({ title: title });
      console.log(response);
      if (response.data.success) {
        await loadCategory();
      }
      console.log(response);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  if (loginStatus !== authState.loggedIn) {
    return <Redirect to={"/login"} />;
  }
  return (
    <div style={{ zIndex: 1, position: "relative" }}>
      {loading && <Loading blur />}
      <Nav />
      <div className="todo-app">
        {categories.map((item) => (
          <TodoCategory info={item} key={item._id} />
        ))}
        <AddCategory handleAddCategory={handleAddCategory} />
      </div>
    </div>
  );
};

export default Todo;
