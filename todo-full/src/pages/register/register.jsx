import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import Loading from "../../components/loading";
import { authState } from "../../redux/slice/authSlice";
import ApiService from "../../service/apiService";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const loginStatus = useSelector((state) => state.authSlice.status);

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSave = async () => {
    try {
      setLoading(true);
      const registerResponse = await ApiService.register(formData);
      console.log(registerResponse);
      if (registerResponse.data.success) {
        history.push("/login");
      }
    } catch (error) {
      alert('Đăng ký thất bại hoặc user bị trùng')
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
        <h1 className="text-center">Register</h1>
        <div className="mb-3">
          <input
            type={"text"}
            value={formData.username}
            name="username"
            className="form-control"
            onChange={handleChange}
            placeholder="User name"
          />
        </div>
        <div className="mb-3">
          <input
            type={"password"}
            value={formData.password}
            name="password"
            onChange={handleChange}
            className="form-control"
            placeholder="Password"
          />
        </div>
        <div>
          <Button color="success" className="w-100" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
