import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import Loading from "../../components/loading";
import { authState } from "../../redux/slice/authSlice";
import ApiService from "../../service/apiService";
import { setLogin } from "../../redux/slice/authSlice";
import "./login.css";
const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const loginStatus = useSelector((state) => state.authSlice.status);
  const history = useHistory()
  // console.log(loginStatus);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const loginResponse = await ApiService.login(formData);
      console.log(loginResponse);
      if (loginResponse.data.success) {
        const { accessToken, username } = loginResponse.data.data;
        localStorage.setItem("todoToken", accessToken);
        dispatch(setLogin(username));
      }
    } catch (error) {
      console.log(error);
      alert("Login fail");
    } finally {
      setLoading(false);
    }
  };
  if (loginStatus === authState.loggedIn) {
    return <Redirect to={"/"} />;
  }
  return (
    <div>
      {loading && <Loading blur />}
      <div className="login p-3">
        <h1 className="text-center">Login</h1>
        <div className="mb-3">
          <input
            type={"text"}
            className="form-control"
            placeholder="User name"
            value={formData.username}
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type={"password"}
            className="form-control"
            placeholder="Password"
            value={formData.password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <Button color="primary" className="w-100" onClick={handleLogin}>
            Login
          </Button>
        </div>
        <div className="text-center my-2">or</div>
        <div>
          <Button color="primary" outline className="w-100" onClick={()=> history.push('/register')}>
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
