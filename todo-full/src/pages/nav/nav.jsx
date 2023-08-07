import React from "react";
import "./nav.css";
import meta from "../../assets/meta.png";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedOut } from "../../redux/slice/authSlice";

const Nav = () => {
  const authInfo = useSelector((state) => state.authSlice.authInfo);
  const dispatch = useDispatch();
  return (
    <nav className="nav-bar">
      <div className="logo">
        <img src={meta} alt="" height={50} />
      </div>
      <div className="fs-2 fw-bold">TO DO APP</div>
      <UncontrolledDropdown className="me-5">
        <DropdownToggle color="light">{authInfo.userName}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => dispatch(setLoggedOut())}>
            Log out
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </nav>
  );
};

export default Nav;
