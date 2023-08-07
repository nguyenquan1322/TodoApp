import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Loading from "./components/loading";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Todo from "./pages/todo/todo";
import { authState } from "./redux/slice/authSlice";
import ApiService from "./service/apiService";
import { setLogin, setLoggedOut } from "./redux/slice/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const checkAuthRes = await ApiService.getUserInfo();
        if (checkAuthRes.data.success) {
          dispatch(setLogin(checkAuthRes.data.data.username));
        }
      } catch (error) {
        dispatch(setLoggedOut());
      }
    };
    checkAuth();
  }, [dispatch]);

  const loginStatus = useSelector((state) => state.authSlice.status);
  if (loginStatus === authState.loading) {
    return <Loading />;
  }
  return (
    <div className="App">
      <Switch>
        <Route path={"/register"}>
          <Register />
        </Route>
        <Route path={"/login"}>
          <Login />
        </Route>
        <Route exact path={"/"}>
          <Todo />
        </Route>
        <Redirect to={"/"} />
      </Switch>
    </div>
  );
}

export default App;
